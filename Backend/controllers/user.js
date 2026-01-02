const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");

module.exports.userprofileEdit=async (req, res) => {
    const userId = req.user.id;
    const { name, username } = req.body;
    const uploadedFile = req.file; 
    const updateData = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (uploadedFile) {
        updateData.profile_image = { 
            url: uploadedFile.path 
        };
        
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true, select: '-password' } 
    );
   if (!updatedUser) {
    throw new ExpressError(404, "User not found");
}
    res.json({ 
        message: "Profile updated successfully!", 
        user: updatedUser 
    });
};

module.exports.userAccountDelete=async (req, res) => {
    const userId = req.user.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new ExpressError(404, "User not found.");
    }

    res.json({ message: "Account deleted successfully." });
};