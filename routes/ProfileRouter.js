

const {Router} = require("express");


const ProfileRouter = Router();
const ProfileIndexController = require("../controllers/profile/ProfileIndexController");
const EditPostGetController = require("../controllers/profile/EditPostGetController");
const EditPostPostController = require("../controllers/profile/EditPostPostController");
const DeletePostController = require("../controllers/profile/DeletePostController");
const DeleteUserController = require("../controllers/profile/DeleteUserController");
const EditUserController = require("../controllers/profile/EditUserController");
const EditUserPostController = require("../controllers/profile/EditUserPostController");
const CommentGetController = require("../controllers/profile/CommentGetController");
const CommentPostController = require("../controllers/profile/CommentPostController");
const EditCommentController = require("../controllers/profile/EditCommentController");
const CommentEditPostController = require("../controllers/profile/CommentEditPostController");
const DeleteCommentController = require("../controllers/profile/DeleteCommentController");


ProfileRouter.get("/", ProfileIndexController);


ProfileRouter.get("/edit/:postid", EditPostGetController);

ProfileRouter.post("/edit/:postid",EditPostPostController);

ProfileRouter.get("/delete/:postid", DeletePostController);

ProfileRouter.get("/deleteUser/:userid", DeleteUserController);

ProfileRouter.get("/editUser", EditUserController);

ProfileRouter.post("/editUser", EditUserPostController);

ProfileRouter.get("/comment/:postid", CommentGetController);

ProfileRouter.post("/comment/:postid", CommentPostController);

ProfileRouter.get("/comment/edit/:commentid", EditCommentController);

ProfileRouter.post("/comment/edit/:commentid", CommentEditPostController);

ProfileRouter.get("/comment/delete/:commentinfo", DeleteCommentController);

module.exports = ProfileRouter;

