const {deletePost} = require("../../database/queries");



const DeletePostController = async function(req, res){
    const {postid} = req.params;
    await deletePost(postid);
    res.redirect("/profile");
}



module.exports = DeletePostController;