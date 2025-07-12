



const {deleteComment} = require("../../database/queries");




const DeleteCommentController = async function(req, res){
    const {commentinfo} = req.params;
    const commentid = commentinfo.split(",")[0];
    const messageid = commentinfo.split(",")[1];
    await deleteComment(Number(commentid));
    res.redirect(`/profile/comment/${messageid}`);
}


module.exports = DeleteCommentController;