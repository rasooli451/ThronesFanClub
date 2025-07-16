

const {getAllLikesByUser, getPostsByUser,getUser} = require("../../database/queries");



const UserProfileIndexController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {id} = req.params;
    const user = await getUser(id);
    const posts = await getPostsByUser(id);
    const likes = await getAllLikesByUser(req.user.user_id);
    res.render("profile", {posts, likes, fromProfile : false,fromUser : true, user});
}

module.exports = UserProfileIndexController;