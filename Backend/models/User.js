const mongoose = require("mongoose");
const Post = require("./Post");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  name: String,
  username: String,
  password: String,
  profile_image: {
    filename: String,
    url: String,
  },
});


userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter());
  if (!user) return next();

  const userId = user._id;

  if (user.role === "Admin") {
    await Post.deleteMany({ author: userId });
  }
  await Post.updateMany(
    {},
    { $pull: { comments: { author: userId } } }
  );

  await Post.updateMany(
    {},
    { $pull: { likes: userId } }
  );

  await Post.updateMany(
    {},
    { $pull: { shares: userId } }
  );

  await Post.updateMany(
    {},
    {
      $pull: {
        "comments.$[].likes": userId,
        "comments.$[].dislikes": userId,
      },
    }
  );

  next();
});

module.exports = mongoose.model("User", userSchema);
