



const {getAllLikesByUser, getPostsByUser} = require("../../database/queries");

const getTimeAgo = require("../../helper/getTimeAgo");

const ProfileIndexController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const AllPosts = await getPostsByUser(req.user.user_id);
    const likes = await getAllLikesByUser(req.user.user_id);
     const postsWithTimeAgo = AllPosts.map(post => ({
    ...post,
    timeAgo: getTimeAgo(post.date)
    }));
    res.render("profile", {posts : postsWithTimeAgo, likes, fromProfile : true, fromUser : false, user : req.user});
}








module.exports = ProfileIndexController;