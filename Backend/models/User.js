const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { 
    type: String,
    enum: ["Admin", "User"], 
    default: "User" 
  },

  name: { 
    type: String, 
    required: true
  },

  username: { 
    type: String, 
    required: true,
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  profile_image: {
    filename: { 
      type: String,
      default: "profile_image" },
    url: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png", 
    },
  },
});

module.exports = mongoose.model("User", userSchema);