


const {Router} = require("express");



const HomePageRouter = Router();
const HomePageIndexController = require("../controllers/homepage/HomePageIndexController");
const HomePageNewPostController = require("../controllers/homepage/HomePageNewPostController");




HomePageRouter.get("/", HomePageIndexController);


HomePageRouter.get("/post", (req, res)=>{
    res.render("newpost.ejs");
})

HomePageRouter.post("/post", HomePageNewPostController);



HomePageRouter.get("/profile", (req,res)=>{

})






module.exports = HomePageRouter;