




const {getCommentsForPost, getPostById} = require("../../database/queries");
const isNumeric = require("../../helper/isNumeric");
const { post } = require("../../routes/HomePageRouter");


//post should exist, if post doesn't exist, there should be a text saying post doesn't exist
const CommentGetController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {postid} = req.params;
    if (isNumeric(postid)){
      const post = await getPostById(postid);
      if (post == null){
        return res.status(404).render("errors", {errors : [{msg : "This post doesn't exist!"}]});
      }
      const comments = await getCommentsForPost(postid);
      res.render("comments", {comments, message_id : postid});
    }
    else{
      res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
    }
}



module.exports = CommentGetController;