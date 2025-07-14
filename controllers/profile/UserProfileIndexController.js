

const {getAllLikesByUser, getPostsByUser,getUser} = require("../../database/queries");



const UserProfileIndexController = async function(req, res){
    const {id} = req.params;
    const user = await getUser(id);
    const posts = await getPostsByUser(id);
    const likes = await getAllLikesByUser(id);
    res.render("profile", {posts, likes, fromProfile : false,fromUser : true, user});
}

module.exports = UserProfileIndexController;