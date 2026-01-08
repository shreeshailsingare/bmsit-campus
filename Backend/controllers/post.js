const mongoose = require("mongoose");
const Post=require("../models/Post.js");
const ExpressError = require("../utils/ExpressError.js");

// module.exports.createPost = async (req, res) => {
//     const { text } = req.body; 
//     const uploadedFile = req.file; 

//     let mediaObject = {};
//     if (uploadedFile) {
//   mediaObject.image = {
//     url: uploadedFile.path,          
//     filename: uploadedFile.filename,
//     contentType: uploadedFile.mimetype   
//   };
// }

//     const newPost = new Post({
//       author: req.user.id,
//       text,
//       ...mediaObject, 
//     });
//     if (!text || !text.trim()) {
//       throw new ExpressError(400, "Post text is required");
//     }
//     const savedPost = await newPost.save();
//     res.status(201).json({ 
//         message: "Post created successfully!", 
//         post: savedPost 
//     });
// };

module.exports.createPost = async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    throw new ExpressError(400, "Post text is required");
  }

  const media = req.files?.map(file => ({
    url: file.path,
    filename: file.filename,
    contentType: file.mimetype
  }));

  const newPost = new Post({
    author: req.user.id,
    text,
    media
  });

  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
};



module.exports.showPosts=async (req, res) => {
  const posts = await Post.find()
  .sort({ createdAt: -1 })
  .populate('author', 'name username profile_image')
  .populate('comments.author', 'name username profile_image');
res.json(posts);

};

module.exports.showPost=async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ExpressError(400, "Invalid post id");
    }
    const post = await Post.findById(id)
      .populate('author', 'name username profile_image');
    if (!post) {
      throw new ExpressError(404, "Post not found");
    }

    res.json(post);
};

module.exports.editPost=async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ExpressError(400, "Invalid post id");
    }
    if (text !== undefined && !text.trim()) {
      throw new ExpressError(400, "Post text cannot be empty");
    }
    const updateData = {};
    if (text) {
      updateData.text = text.trim();
    }
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        filename: req.file.filename,
        contentType: req.file.mimetype
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true 
      }
    )
      .populate("author", "name username profile_image")
      .populate("comments.author", "name username profile_image");

    if (!updatedPost) {
      throw new ExpressError(404, "Post not found");
    }
    res.json({
      message: "Post updated successfully",
      post: updatedPost
    });
  };


  module.exports.deletePost=async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      throw new ExpressError(404, "Post not found");
    }
    res.json({ message: "Post deleted", post });
  };

  module.exports.postLike=async (req, res) => {
      const userId = req.user.id;
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
          throw new ExpressError(404, "Post not found");
      }  
      const alreadyLiked = post.likes.some(
        (id) => id.toString() === userId.toString()
      );
  
      if (alreadyLiked) {
        post.likes = post.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        post.likes.push(userId);
      }
      await post.save();
      const updatedPost = await Post.findById(postId)
        .populate('author', 'name username profile_image')
        .populate('comments.author', 'name username profile_image');
      res.status(200).json({
        success: true,
        action: alreadyLiked ? "unliked" : "liked",
        likesCount: post.likes.length
      });
  };

   module.exports.postComment=async (req, res) => {
       const userId = req.user.id;
       const postId = req.params.id;
       const { text } = req.body;
       if (!text || text.trim().length === 0) {
           throw new ExpressError(400, "Comment text required");
       }
       const post = await Post.findById(postId);
      if (!post) {
       throw new ExpressError(404, "Post not found");
   }
       post.comments.push({ author: userId, text: text.trim() });
       await post.save();
       const populatedPost = await Post.findById(postId)
         .populate('author', 'name username profile_image')
         .populate('comments.author', 'name username profile_image');
       const newComment = populatedPost.comments[populatedPost.comments.length - 1];
       res.status(201).json({
         message: 'Comment added successfully',
         comment: newComment,
       });
   };

   module.exports.postShare=async (req, res) => {
       const userId = req.user.id;
       const postId = req.params.id;
       if (!mongoose.Types.ObjectId.isValid(postId)) {
           throw new ExpressError(400, "Invalid post id");
       }
       const post = await Post.findById(postId);
       if (!post) {
           throw new ExpressError(404,'Post not found');
       }
       if (!post.shares.some(id => id.equals(userId))) post.shares.push(userId);
       await post.save();
       res.json({ sharesCount: post.shares.length });
       
   };

 module.exports.postSaves = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const alreadySaved = post.saves.some(
      id => id.toString() === userId
    );

    if (alreadySaved) {
      post.saves.pull(userId);
    } else {
      post.saves.push(userId);
    }

    await post.save();

    res.json({
      action: alreadySaved ? "unsaved" : "saved",
      saves: post.saves,
    });

  } catch (err) {
    console.error("Save post error:", err);
    res.status(500).json({ error: "Failed to save post" });
  }
};

   module.exports.postCommentLike=async (req, res) => {
       const userId = req.user.id;
       const { postId, commentId } = req.params;
       const post = await Post.findOne({ _id: postId });
       if (!post) {
           throw new ExpressError(404, "Post not found");
       }
       const comment = post.comments.id(commentId);
       if (!comment) {
           throw new ExpressError(404, "Comments not found");
       }
       const alreadyLiked = comment.likes.some(
         (id) => id.toString() === userId.toString()
       );
       if (alreadyLiked) {
         comment.likes = comment.likes.filter(
           (id) => id.toString() !== userId.toString()
         );
       } else {
         
         comment.likes.push(userId);
         comment.dislikes = comment.dislikes.filter(
           (id) => id.toString() !== userId.toString()
         );
       }
       await post.save();
       const updatedPost = await Post.findById(postId)
         .populate('author', 'name username profile_image')
         .populate('comments.author', 'name username profile_image')
         .exec();
       const updatedComment = updatedPost.comments.id(commentId);
   
       res.status(200).json({
           success: true,
           action: alreadyLiked ? "unliked" : "liked",
           comment: {
               _id: updatedComment._id,
               likesCount: updatedComment.likes.length,
               dislikesCount: updatedComment.dislikes.length,
           }
       });
   };

   module.exports.postCommentDislike=async (req, res) => {
       const userId = req.user.id;
       const { postId, commentId } = req.params;
   
       const post = await Post.findOne({ _id: postId });
       if (!post) {
           throw new ExpressError(404, "Post not found");
       }
       const comment = post.comments.id(commentId);
       if (!comment) {
           throw new ExpressError(404, "Comment not found");
       }
       const alreadyDisliked = comment.dislikes.some(
         (id) => id.toString() === userId.toString()
       );
       comment.likes = comment.likes.filter(
         (id) => id.toString() !== userId.toString()
       );
       if (alreadyDisliked) {
         
         comment.dislikes = comment.dislikes.filter(
           (id) => id.toString() !== userId.toString()
         );
       } else {
         comment.dislikes.push(userId);
       }
       
       await post.save();
       
       const updatedPost = await Post.findById(postId)
         .populate('author', 'name username profile_image')
         .populate('comments.author', 'name username profile_image')
         .exec();
       const updatedComment = updatedPost.comments.id(commentId);
   
       res.status(200).json({
           success: true,
           action: alreadyDisliked ? "removed" : "disliked",
           comment: {
               _id: updatedComment._id,
               likesCount: updatedComment.likes.length,
               dislikesCount: updatedComment.dislikes.length
           }
       });
   }


    module.exports.ShowSavedPost=async (req, res) => {
      try {
        const userId = req.user.id;
    
        const savedPosts = await Post.find({ saves: userId })
          .populate("author", "name username profile_image")
          .sort({ createdAt: -1 });
    
        res.json(savedPosts);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch saved posts" });
      }
    };