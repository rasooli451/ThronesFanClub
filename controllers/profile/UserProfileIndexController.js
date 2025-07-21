

const {getAllLikesByUser, getPostsByUser,getUser} = require("../../database/queries");

const getTimeAgo = require("../../helper/getTimeAgo");
const isNumeric = require("../../helper/isNumeric");


//an extra check to see if user is a member or not, since if they are not a member, they shoudn't be able to visit other users' profiles.
const UserProfileIndexController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    if (!req.user.ismember){
      return res.render("notamember");
    }
    const {id} = req.params;
    if (isNumeric(id)){
      const user = await getUser(id);
      if (user != null){
        const posts = await getPostsByUser(id);
        const likes = await getAllLikesByUser(req.user.user_id);
        const postsWithTimeAgo = posts.map(post => ({
        ...post,
        timeAgo: getTimeAgo(post.date)
        }));
        res.render("profile", {posts : postsWithTimeAgo, likes, fromProfile : false,fromUser : true, user});
        }
      else{
         res.status(500).render("errors", [{msg : "User doesn't Exist."}])
      }
    }
    else{
      res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
    }
}













module.exports = UserProfileIndexController;