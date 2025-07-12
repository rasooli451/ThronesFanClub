




const {getCommentsForPost} = require("../../database/queries");



const CommentGetController = async function(req, res){
    const {postid} = req.params;
    const comments = await getCommentsForPost(postid);
    res.render("comments", {comments, message_id : postid});
}



module.exports = CommentGetController;