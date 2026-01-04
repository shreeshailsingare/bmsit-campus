const express=require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Post=require("../models/Post.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const {isAdmin,verifyToken,upload} = require("../middleware.js");
const postController = require("../controllers/post.js");

router.route("/")
    
    .post(verifyToken,isAdmin, upload.single('media'), wrapAsync(postController.createPost))
    .get(wrapAsync(postController.showPosts));

router.route("/:id")
    .get( wrapAsync(postController.showPost))
    .put(verifyToken,isAdmin,upload.single("media"),wrapAsync(postController.editPost))
    .delete(verifyToken,isAdmin,wrapAsync(postController.deletePost));


router.post('/:id/like', verifyToken, wrapAsync(postController.postLike));
router.post('/:id/comment', verifyToken, wrapAsync(postController.postComment));
router.post('/:id/share', verifyToken, wrapAsync(postController.postShare));
router.post("/:id/save", verifyToken,wrapAsync(postController.postSaves) );

router.post('/:postId/comments/:commentId/like', verifyToken, wrapAsync(postController.postCommentLike));
router.post('/:postId/comments/:commentId/dislike', verifyToken,wrapAsync(postController.postCommentDislike));

router.get("/saved/me", verifyToken,postController.ShowSavedPost );


module.exports = router;


