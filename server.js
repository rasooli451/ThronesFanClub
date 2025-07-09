



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
const { error } = require("node:console");
const asyncHandler = require("express-async-handler");
const pgSession = require("connect-pg-simple")(session);
const HomePageRouter = require("./routes/HomePageRouter");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
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
    body("username").trim().escape().isLength({min: 1, max : 255}).withMessage("username should be between 1 and 255 characters"),
    body("email").trim().escape().isEmail().withMessage("email is in the wrong format"),
    body("password").escape()
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
}], passport.authenticate("local", {successRedirect : "/", failureRedirect : "/login"}))

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
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
    const {username,email,password,confirmPassword} = req.body;
    if (password != confirmPassword){
        return res.status(500).render("errors", {errors : [{msg : "The Password in confirm password doesn't match your password, please try again!"}]});
    }
    else{
        const hasedPassword = await bcrypt.hash(password, 10);
        await Pool.query("INSERT INTO users (username,password,email,isAdmin,isMember) VALUES($1,$2,$3,$4,$5)", [username, hasedPassword,email,0,0]);
        res.redirect("/login");
    }
})])


app.use("/homepage", HomePageRouter);


passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const { rows } = await Pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});





app.listen(PORT, ()=>{
    console.log(`Server running at Port ${PORT}`);
})