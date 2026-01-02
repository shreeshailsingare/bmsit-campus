const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const authController = require("../controllers/auth.js");
const {verifyToken} = require("../middleware.js");

router.post("/signup", wrapAsync(authController.signUp));
router.post("/login", wrapAsync(authController.login));


router.get("/me",verifyToken,wrapAsync(authController.TokenAuth));

module.exports = router;
