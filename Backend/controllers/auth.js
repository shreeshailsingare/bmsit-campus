const User = require("../models/User.js");
const ExpressError = require("../utils/ExpressError.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.signUp=async (req, res) => {
  const { name, username, password, role } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
    throw new ExpressError(400, "Username already exists");
}
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ 
        name, 
        username, 
        password: hashed, 
        role,    
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    throw new ExpressError(400, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ExpressError(400, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      role: user.role, 
      profile_image: user.profile_image || { url: null },
    },
  });
};


module.exports.TokenAuth = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
