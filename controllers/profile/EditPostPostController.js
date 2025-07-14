


const {editPost, getUserIdFromMessageId} = require("../../database/queries");
const {body,validationResult} = require("express-validator");


const validateMessage = [
    body("message").trim().isLength({min : 1, max : 3000}).withMessage("The post should be between 1 and 3000 characters")
];



const EditPostPostController = [validateMessage ,async function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()});
    }
    const {postid} = req.params;
    const {message, fromUser} = req.body;
    await editPost(postid, message);
    if (fromUser == 'true'){
        const id = await getUserIdFromMessageId(postid);
        res.redirect(`/profile/user/${id}`);
    }
    else{
        res.redirect("/profile");
    }
}]




module.exports = EditPostPostController;