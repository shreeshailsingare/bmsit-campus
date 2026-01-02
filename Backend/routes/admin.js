const express=require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const adminController = require("../controllers/admin.js");


router.get("/posts/:name", wrapAsync(adminController.showAdmin));

module.exports = router;
