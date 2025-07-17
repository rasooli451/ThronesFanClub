

const {getAllPosts, getAllLikesByUser} = require("../../database/queries");
const getTimeAgo = require("../../helper/getTimeAgo");


const HomePageIndexController = async (req, res)=>{
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const AllPosts = await getAllPosts();
    const likes = await getAllLikesByUser(req.user.user_id);
    const postsWithTimeAgo = AllPosts.map(post => ({
    ...post,
    timeAgo: getTimeAgo(post.date)
    }));

    res.render("homepage", {posts : postsWithTimeAgo, likes : likes, fromProfile : false, fromUser : false});
}






module.exports = HomePageIndexController;



