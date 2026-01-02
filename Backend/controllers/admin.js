const User = require("../models/User.js");
const Post = require("../models/Post.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.showAdmin = async (req, res) => {
  const { name } = req.params;
  const searchName = decodeURIComponent(name).trim();
  const admin = await User.findOne({
    $or: [
      { username: { $regex: new RegExp(`^${searchName}$`, "i") } },
      { name: { $regex: new RegExp(`^${searchName}$`, "i") } }
    ]
  }).select("-password");

  if (!admin) {
    throw new ExpressError(404, "Admin profile not found");
  }

  const posts = await Post.find({ author: admin._id })
    .sort({ createdAt: -1 })
    .populate("author", "name username profile_image")
    .populate("comments.author", "username profile_image");

  res.json({
    admin,
    posts,
  });
};
