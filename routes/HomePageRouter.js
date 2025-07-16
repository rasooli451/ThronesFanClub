


const {Router} = require("express");



const HomePageRouter = Router();
const HomePageIndexController = require("../controllers/homepage/HomePageIndexController");
const HomePageNewPostController = require("../controllers/homepage/HomePageNewPostController");




HomePageRouter.get("/", HomePageIndexController);


HomePageRouter.get("/post", (req, res)=>{
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    res.render("newpost.ejs");
})

HomePageRouter.post("/post", HomePageNewPostController);









module.exports = HomePageRouter;