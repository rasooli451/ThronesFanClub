

const {AddCommentToPost} = require("../../database/queries");
const {body, validationResult} = require("express-validator");




const validateComment = [
    body("comment").trim().isLength({min : 1, max : 1000}).withMessage("Comments should be between 1 and 1000 characters")
];




const CommentPostController = [validateComment, async function(req, res){
    if (!req.user.ismember){
        return res.render("notamember");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()});
    }
    const {comment} = req.body;
    const {postid} = req.params;
    await AddCommentToPost(postid, req.user.user_id, comment);
    res.redirect(`/profile/comment/${postid}`);
}];




module.exports = CommentPostController;