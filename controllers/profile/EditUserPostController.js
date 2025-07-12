
const {editUser} = require("../../database/queries");
const {body, validationResult} = require("express-validator");



const validateEdit = [
    body("username").trim().isLength({min: 1, max : 255}).withMessage("username should be between 1 and 255 characters"),
    body("email").trim().isEmail().withMessage("email is in the wrong format"),
    body("character").notEmpty().withMessage("Please choose a favorite character")
];



const EditUserPostController = [validateEdit, async function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(500).render("errors", {errors : errors.array()});
    }
    const {username, email, character} = req.body;

    const result = await editUser(req.user.user_id, username, email, character);
    if (result){
        res.redirect("/profile");
    }
    else{
        res.status(500).render("errors", {errors : [{msg : "A user by this username already exists."}]})
    }
}]


module.exports = EditUserPostController;