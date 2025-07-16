



const {deleteComment} = require("../../database/queries");




const DeleteCommentController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {commentinfo} = req.params;
    const commentid = commentinfo.split(",")[0];
    const messageid = commentinfo.split(",")[1];
    await deleteComment(Number(commentid));
    res.redirect(`/profile/comment/${messageid}`);
}


module.exports = DeleteCommentController;