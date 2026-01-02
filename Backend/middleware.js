const jwt = require("jsonwebtoken");
const multer  = require('multer');
const { storage } = require('./cloudConfig.js');

module.exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role?.toLowerCase() === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Forbidden. Admin access required."
  });
};



module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};


module.exports.upload=multer({ 
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 } 
  
} );