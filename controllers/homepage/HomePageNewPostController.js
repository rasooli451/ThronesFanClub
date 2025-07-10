


const {createNewPost} = require("../../database/queries");
const {body,validationResult} = require("express-validator");


const validateMessage = [
    body("message").escape().trim().isLength({min : 1, max : 3000}).withMessage("The post should be between 1 and 3000 characters")
];


const HomePageNewPostController = [validateMessage, async function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()});
    }
    const {message} = req.body;
    const date = new Date();
    const userId = req.user.user_id;
    await createNewPost(message, date, userId);
    res.redirect("/homepage");
}]


module.exports = HomePageNewPostController;