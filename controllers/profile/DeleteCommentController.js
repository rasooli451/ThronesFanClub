



const {deleteComment} = require("../../database/queries");
const isNumeric = require("../../helper/isNumeric");


//errors to handle: user should only be able to delete their own comments, exceptions if the logged in user is admin, I know i don't show an option for users to delete other user's comments, but they can bypass this by just plain out writing the route path on the url, needs to be worked on.
const DeleteCommentController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {commentinfo} = req.params;
    const commentid = commentinfo.split(",")[0];
    const messageid = commentinfo.split(",")[1];
    if (isNumeric(commentid) && isNumeric(messageid)){
      await deleteComment(Number(commentid));
      res.redirect(`/profile/comment/${messageid}`);
    }
    else{
      res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
    }
}


module.exports = DeleteCommentController;