


const {getCommentById} = require("../../database/queries");


const EditCommentController = async function(req, res){
    const {commentid} = req.params;
    const comment = await getCommentById(commentid);
    res.render("editcomment", {comment});
}

module.exports = EditCommentController;