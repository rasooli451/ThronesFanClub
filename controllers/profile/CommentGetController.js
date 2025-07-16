




const {getCommentsForPost} = require("../../database/queries");



const CommentGetController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {postid} = req.params;
    const comments = await getCommentsForPost(postid);
    res.render("comments", {comments, message_id : postid});
}



module.exports = CommentGetController;