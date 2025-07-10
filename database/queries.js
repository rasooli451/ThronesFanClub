
const Pool = require("./pool");
const asyncHandler = require("express-async-handler");





const getAllPosts = asyncHandler(async function(){
    const {rows} = await Pool.query("SELECT m.message_id,m.message,m.date,u.username,COALESCE(l.like_count, 0) AS like_count,COALESCE(c.comment_count, 0) AS comment_count FROM messages m JOIN users u ON m.owner_id = u.user_id LEFT JOIN (SELECT message_id, COUNT(*) AS like_count FROM likes GROUP BY message_id) l ON m.message_id = l.message_id LEFT JOIN (SELECT message_id, COUNT(*) AS comment_count FROM comments GROUP BY message_id) c ON m.message_id = c.message_id ORDER BY m.date DESC");
    return rows;
});

const getAllLikesByUser = asyncHandler(async function(user_id){
    const {rows} = await Pool.query("SELECT message_id FROM likes WHERE owner_id=($1)", [user_id]);
    return rows;
})



const createNewPost = asyncHandler(async function(message, date, owner_id){
    await Pool.query("INSERT INTO messages (message,date,owner_id) VALUES ($1,$2,$3)",[message,date,owner_id]);
})


const likePost = asyncHandler(async function(owner_id, message_id){
    await Pool.query("INSERT INTO likes (owner_id,message_id) VALUES ($1,$2)", [owner_id, message_id]);
})

const dislikePost = asyncHandler(async function(owner_id, message_id){
    await Pool.query("DELETE FROM likes WHERE owner_id=($1) AND message_id=($2)", [owner_id, message_id]);
})





module.exports = {getAllPosts, getAllLikesByUser,createNewPost,likePost,dislikePost};