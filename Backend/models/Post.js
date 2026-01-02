const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// commentSchema
const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
     type: String,
     required: true 
    },

  createdAt: { 
    type: Date,
    default: Date.now 
  },

  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);


//PostSchema
const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  adminName: {
     type: String
  }, 

  username: { 
    type: String 
  }, 

  adminProfileImage: { 
    type: String 
  }, 

  text: { 
    type: String,
    required: true
   },

  image: {
    filename: { 
      type: String, 
      default: "post_content" },
    contentType: String,
    url: String,
  },

  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  comments: [commentSchema],                             
  shares: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
},
{ timestamps: true });

module.exports = mongoose.model("Post", postSchema);
