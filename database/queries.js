
const Pool = require("./pool");
const asyncHandler = require("express-async-handler");





const getAllPosts = asyncHandler(async function(){
    const {rows} = await Pool.query("SELECT m.message_id,m.message,m.date,u.username,u.favorite,u.user_id,COALESCE(l.like_count, 0) AS like_count,COALESCE(c.comment_count, 0) AS comment_count FROM messages m JOIN users u ON m.owner_id = u.user_id LEFT JOIN (SELECT message_id, COUNT(*) AS like_count FROM likes GROUP BY message_id) l ON m.message_id = l.message_id LEFT JOIN (SELECT message_id, COUNT(*) AS comment_count FROM comments GROUP BY message_id) c ON m.message_id = c.message_id ORDER BY m.date DESC");
    return rows;
});

const getAllLikesByUser = asyncHandler(async function(user_id){
    const {rows} = await Pool.query("SELECT message_id FROM likes WHERE owner_id=($1)", [user_id]);
    return rows;
})



const getCommentsForPost = asyncHandler(async function(message_id){
    const {rows} = await Pool.query("SELECT comments.*,users.username, users.favorite FROM comments INNER JOIN users ON comments.owner_id=users.user_id WHERE comments.message_id=($1) ORDER BY comments.comment_id ASC", [message_id]);
    return rows;
})


const AddCommentToPost = asyncHandler(async function(message_id, owner_id, comment){
    await Pool.query("INSERT INTO comments (comment,owner_id,message_id) VALUES ($1,$2,$3)", [comment, owner_id, message_id]);
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


const getPostsByUser = asyncHandler(async function(user_id){
    const {rows} = await Pool.query("SELECT m.message_id,m.message,m.date,u.username,u.user_id,u.favorite,COALESCE(l.like_count, 0) AS like_count,COALESCE(c.comment_count, 0) AS comment_count FROM messages m JOIN users u ON m.owner_id = u.user_id LEFT JOIN (SELECT message_id, COUNT(*) AS like_count FROM likes GROUP BY message_id) l ON m.message_id = l.message_id LEFT JOIN (SELECT message_id, COUNT(*) AS comment_count FROM comments GROUP BY message_id) c ON m.message_id = c.message_id WHERE m.owner_id=($1) ORDER BY m.date DESC", [user_id]);
    return rows;
})


const getPostById = asyncHandler(async function(message_id){
    const {rows} = await Pool.query("SELECT * FROM messages WHERE message_id=($1)", [message_id]);
    if (rows.length > 0){
        return rows[0];
    }
    else{
        return null;
    }
})


const editPost = asyncHandler(async function(message_id, message){
    await Pool.query("UPDATE messages SET message=($1) WHERE message_id=($2)", [message, message_id]);
})


const deletePost = asyncHandler(async function(message_id){
    await Pool.query("DELETE FROM messages WHERE message_id=($1)", [message_id]);
})

const deleteUser = asyncHandler(async function(user_id){
    const userExists = await userExistsById(user_id);
    if (userExists){
        await Pool.query("DELETE FROM users WHERE user_id=($1)", [user_id]);
        return true;
    }
    else{
        return false;
    }
})


const userExistsById = asyncHandler(async function(user_id){
    const {rows} = await Pool.query("SELECT * FROM users WHERE user_id=($1)", [user_id]);
    if (rows.length > 0){
        return true;
    }
    else{
        return false;
    }
})

const userExists = asyncHandler(async function(username){
    const {rows} = await Pool.query("SELECT * FROM users WHERE username=($1)", [username]);
    if (rows.length > 0){
        return true;
    }
    else{
        return false;
    }
})

const editUser = asyncHandler(async function(user_id, username, email, character){
    const {rows} = await Pool.query("SELECT * FROM users WHERE user_id=($1)", [user_id]);
    if (rows[0].username != username){
        const exists = await userExists(username);
        if (exists){
            return false;
        }
    }
    await Pool.query("UPDATE users SET username=($1),email=($2),favorite=($3) WHERE user_id=($4)", [username, email, character, user_id]);
    return true;
})


const getCommentById = asyncHandler(async function(comment_id){
    const {rows} = await Pool.query("SELECT * FROM comments WHERE comment_id=$1", [comment_id]);
    if (rows.length > 0){
        return rows[0];
    }
    else{
        return null;
    }
})

const editComment = asyncHandler(async function(comment_id, comment){
    await Pool.query("UPDATE comments SET comment=$1 WHERE comment_id=$2", [comment, comment_id]);
})

const deleteComment = asyncHandler(async function(comment_id){
    await Pool.query("DELETE FROM comments WHERE comment_id=$1", [comment_id]);
})

const getUser = asyncHandler(async function(user_id){
    const {rows} = await Pool.query("SELECT * FROM users WHERE user_id=$1", [user_id]);
    if (rows.length > 0){
        return rows[0];
    }
    else{
        return null;
    }
})

const getUserIdFromMessageId = asyncHandler(async function(message_id){
    const {rows } = await Pool.query("SELECT owner_id FROM messages WHERE message_id=$1", [message_id]);
    if (rows.length > 0)
       return rows[0].owner_id;
    else
        return null;
})

const updateMembership = asyncHandler(async function(user_id){
    await Pool.query("UPDATE users SET ismember=1 WHERE user_id=$1", [user_id]);
})

const revokeMembership = asyncHandler(async function(user_id){
    await Pool.query("UPDATE users SET ismember=0 WHERE user_id=$1", [user_id]);
})

module.exports = {getAllPosts, getAllLikesByUser,createNewPost,likePost,dislikePost, getPostsByUser,getPostById, editPost,deletePost,deleteUser, editUser,getCommentsForPost, AddCommentToPost, getCommentById, editComment, deleteComment,getUser, getUserIdFromMessageId,updateMembership, userExistsById};