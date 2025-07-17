


const {getCommentById} = require("../../database/queries");
const isNumeric = require("../../helper/isNumeric");


//user should not be able to edit other people's comments, they can only comment their own comments, it should be checked if the comment that the user is attempting to edit is the user's and not someone else's comment and of course, the comment should exist in the first place.

const EditCommentController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {commentid} = req.params;
    if (isNumeric(commentid)){
      const comment = await getCommentById(commentid);
      if (comment != null)
          res.render("editcomment", {comment});
      else
        res.status(404).render("errors", {errors : [{msg : "Comment doesn't exist!"}]});
    }
    else{
      res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
    }
}

module.exports = EditCommentController;