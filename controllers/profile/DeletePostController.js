const {deletePost,getUserIdFromMessageId, doesUserOwnPost} = require("../../database/queries");
const isNumeric = require("../../helper/isNumeric");


const DeletePostController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {postinfo} = req.params;
    const postid = postinfo.split(",")[0];
    let problem = false;
    if (isNumeric(postid)){
      const fromUser = postinfo.split(",")[1];
      let redirectURL = "/profile";
      if (fromUser == "true"){
        if (req.user.isadmin){
          const owner = await getUserIdFromMessageId(postid);
          if (owner == null){
              problem = true;
          }
          redirectURL = `/profile/user/${owner}`; 
        }
        else{
          problem = true;
        }
      }
      else{
        const userOwnsPost = await doesUserOwnPost(postid, req.user.user_id);
        if (!userOwnsPost){
          problem = true;
        }
      }
      if (!problem){
        await deletePost(postid);
        res.redirect(redirectURL);
      }
      else{
        return res.status(500).render("errors", {errors: [{msg : "Deletion unsuccessful, You are not an Admin or post doesn't exist or you are trying to delete another user's post."}]});
      }
      }
      else{
         res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
      }
}



module.exports = DeletePostController;