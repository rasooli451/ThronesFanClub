


const {getPostById} = require("../../database/queries");


const EditPostGetController = async function(req, res){
    const {postid} = req.params;
    const post = await getPostById(postid);
    res.render("editpost", {post : post});
}




module.exports = EditPostGetController;