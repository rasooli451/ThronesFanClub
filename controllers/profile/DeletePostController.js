const {deletePost,getUserIdFromMessageId} = require("../../database/queries");



const DeletePostController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {postinfo} = req.params;
    const postid = postinfo.split(",")[0];
    const fromUser = postinfo.split(",")[1];
    let redirectURL = "/profile";
    if (fromUser == "true"){
        const owner = await getUserIdFromMessageId(postid);
        redirectURL = `/profile/user/${owner}`;
    }
    await deletePost(postid);
    res.redirect(redirectURL);
}



module.exports = DeletePostController;