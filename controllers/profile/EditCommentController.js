


const {getCommentById} = require("../../database/queries");


const EditCommentController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {commentid} = req.params;
    const comment = await getCommentById(commentid);
    res.render("editcomment", {comment});
}

module.exports = EditCommentController;