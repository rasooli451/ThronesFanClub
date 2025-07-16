


const {editComment} = require("../../database/queries");
const {body, validationResult} = require("express-validator");

const validateEdit = [
    body("comment").trim().isLength({min : 1, max : 500}).withMessage("Comments should be between 1 and 500 characters")
];

const CommentEditPostController = [validateEdit, async function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).render("errors", {errors : errors.array()})
    }
    const {comment, message_id} = req.body;
    const {commentid} = req.params;
    if (isNaN(commentid)){
        return res.status(404).render("errors", {errors : [{msg : 'Comment does not exist!'}]})
    }
    await editComment(commentid, comment);
    res.redirect(`/profile/comment/${message_id}`);
}]



module.exports = CommentEditPostController;