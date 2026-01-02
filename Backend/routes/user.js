const express=require("express");
const router = express.Router();
const User = require("../models/User.js");
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const userController = require("../controllers/user.js");
const {verifyToken,upload} = require("../middleware.js");


router.put("/profile", verifyToken, upload.single('profileImage'), wrapAsync(userController.userprofileEdit));
router.delete("/account", verifyToken, wrapAsync(userController.userAccountDelete));


module.exports = router;
