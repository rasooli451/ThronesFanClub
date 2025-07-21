


const {editComment} = require("../../database/queries");
const {body, validationResult} = require("express-validator");

const validateEdit = [
    body("comment").trim().isLength({min : 1, max : 500}).withMessage("Comments should be between 1 and 500 characters")
];


//user should only be able to edit their own comments, if user is not a member they shouldn't be able to edit their comments, it should be checked if the comment's owner id is equal to the user who is trying to edit the comment
const CommentEditPostController = [validateEdit, async function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()})
    }
    const {comment, message_id} = req.body;
    const {commentid} = req.params;
    await editComment(commentid, comment);
    res.redirect(`/profile/comment/${message_id}`);
}]



module.exports = CommentEditPostController;