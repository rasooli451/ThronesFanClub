



const express = require("express");
const path = require("node:path");
const app = express();
const staticAssetSource = path.join(__dirname, "public");
const PORT = 5000;
const Pool = require("./database/pool");
const session = require("express-session");
const passport = require("passport");
const {body, validationResult} = require("express-validator");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const pgSession = require("connect-pg-simple")(session);
const HomePageRouter = require("./routes/HomePageRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const {likePost,dislikePost} = require("./database/queries");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const {Client} = require("pg");

require("dotenv").config();

app.use(express.static(staticAssetSource));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({store : new pgSession({
  pool : Pool,
  tableName : 'userSessions',
  createTableIfMissing : true
}), secret : process.env.SECRET, resave : false, saveUninitialized : false,
cookie : {
  maxAge : 1000 * 60 * 60 * 24
}}));

const validateLogin = [
    body("username").trim().escape(),
    body("password").escape()
];


const validateSignUp = [
    body("username").trim().isLength({min: 1, max : 255}).withMessage("username should be between 1 and 255 characters"),
    body("email").trim().isEmail().withMessage("email is in the wrong format"),
    body("character").notEmpty().withMessage("Please choose a favorite character")
];


app.use(passport.session());



passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await Pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


app.get("/", (req, res)=>{
    if (req.user){
        res.redirect("/homepage");
    }
    else{
        res.redirect("/login");
    }
})



app.get("/login", (req, res)=>{
    res.render("login");
})


app.post("/login",[validateLogin, (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()});
    }
    next();
}], passport.authenticate("local", {successRedirect : "/homepage", failureRedirect : "/login"}))

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
  });
});

app.get("/signup", (req, res)=>{
    res.render("signup");
})


app.post("/signup", [validateSignUp, asyncHandler(async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()});
    }
    const {username,email,password,confirmPassword,character} = req.body;
    const {rows} = await Pool.query("SELECT * FROM users WHERE username=($1)", [username]);
    if (!rows.length > 0){
      if (password != confirmPassword){
        return res.status(500).render("errors", {errors : [{msg : "The Password in confirm password doesn't match your password, please try again!"}]});
      }
      else{
          const hasedPassword = await bcrypt.hash(password, 10);
          await Pool.query("INSERT INTO users (username,password,email,isAdmin,isMember,favorite) VALUES($1,$2,$3,$4,$5,$6)", [username, hasedPassword,email,0,0,character]);
          res.redirect("/login");
      }
    }
    else{
      res.status(500).render("errors", {errors : [{msg : "An account by this username already exists."}]})
    }
})])


app.use("/homepage", HomePageRouter);

app.use("/profile", ProfileRouter);

app.get("/notamember", (req,res)=>{
  res.render("notamember");
})



app.post("/api/like", async (req, res)=>{
  const {messageId, isLike} = req.body;
  const userId = req.user.user_id;
  if (isLike){
    await likePost(userId, messageId);
  }
  else{
    await dislikePost(userId,messageId);
  }
  res.json({ success: true });
})

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const { rows } = await Pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    if (rows.length === 0){
      return done(null, false);
    }
    const user = rows[0];
    done(null, user);
  } catch(err) {
    done(err);
  }
});


app.get("/populate", async (req,res)=>{
  const SQL = `
     
     CREATE TABLE IF NOT EXISTS users(
     user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     username VARCHAR (255),
     password VARCHAR (255),
     email VARCHAR (100),
     isAdmin INTEGER,
     isMember INTEGER,
     favorite VARCHAR (100)
     );

     INSERT INTO users (username,password,email,isAdmin,isMember) VALUES ('The Bastard King', '$2b$10$nuTe3MJ69x8CpOu2aFQK/uML/KF7/pw8y7RciyGTZ9nvfcdrbFHVi', 'rasoolyfarhad7@gmail.com', 1, 1);


     CREATE TABLE IF NOT EXISTS messages(
     message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     message VARCHAR (3000),
     date TIMESTAMPTZ,
     owner_id INTEGER);

     ALTER TABLE messages ADD FOREIGN KEY(owner_id)
     REFERENCES users(user_id) ON DELETE CASCADE;

     CREATE TABLE IF NOT EXISTS comments(
     comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     comment VARCHAR (1000),
     owner_id INTEGER,
     message_id INTEGER);

     ALTER TABLE comments ADD FOREIGN KEY(owner_id)
     REFERENCES users(user_id) ON DELETE CASCADE;

     ALTER TABLE comments ADD FOREIGN KEY(message_id)
     REFERENCES messages(message_id) ON DELETE CASCADE;

     CREATE TABLE IF NOT EXISTS likes(
     like_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     owner_id INTEGER,
     message_id INTEGER);

     ALTER TABLE likes ADD FOREIGN KEY(owner_id)
     REFERENCES users(user_id) ON DELETE CASCADE;

     ALTER TABLE likes ADD FOREIGN KEY(message_id)
     REFERENCES messages(message_id) ON DELETE CASCADE;

`;
const client = new Client({
        connectionString : `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
})


app.use((req, res, next)=>{
    res.status(404).render("errors", {errors : [{msg : "Sorry, the page you were looking for cannot be found."}]})
})


app.use((err, req, res, next) =>{
    res.status(500).render("errors", {errors : [{msg : err.message}]})
})


app.listen(PORT, ()=>{
    console.log(`Server running at Port ${PORT}`);
})