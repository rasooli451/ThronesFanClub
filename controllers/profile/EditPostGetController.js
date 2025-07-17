


const {getPostById} = require("../../database/queries");
const isNumeric = require("../../helper/isNumeric");




//users should not be allowed to edit other people's posts, it should be checked if the post that the user is editing is user's post and not someone else's post, and there should also be a check if the post even exist in the first place.
const EditPostGetController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {postinfo} = req.params;
    const id = postinfo.split(",")[0];
    if (isNumeric(id)){
      const fromUser = postinfo.split(",")[1];
      const post = await getPostById(id);
      if (post != null){
        res.render("editpost", {post : post, fromUser});
      }
      else{
        res.status(404).render("errors", {errors : [{msg : "Post doesn't exist!"}]})
      }
    }
    else{
      res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
    }
}




module.exports = EditPostGetController;