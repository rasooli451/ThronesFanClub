

const {getAllPosts, getAllLikesByUser} = require("../../database/queries");



const HomePageIndexController = async (req, res)=>{
    const AllPosts = await getAllPosts();
    const likes = await getAllLikesByUser(req.user.user_id);
    res.render("homepage", {posts : AllPosts, likes : likes});
}



