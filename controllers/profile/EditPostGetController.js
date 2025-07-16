


const {getPostById} = require("../../database/queries");


const EditPostGetController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {postinfo} = req.params;
    const id = postinfo.split(",")[0];
    const fromUser = postinfo.split(",")[1];
    const post = await getPostById(id);
    res.render("editpost", {post : post, fromUser});
}




module.exports = EditPostGetController;