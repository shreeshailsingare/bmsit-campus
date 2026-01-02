if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Post=require("./models/Post.js");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer  = require('multer');
const path = require('path'); 
const { storage } = require('./cloudConfig.js');
const session = require("express-session");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const posts = require("./routes/post.js");
const users = require("./routes/user.js");
const auths = require("./routes/auth.js");
const admins = require("./routes/admin.js");

const PORT = process.env.PORT || 8080;
const uri= process.env.MONGO_URL;


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

async function main() {
  await mongoose.connect(uri);
}

main()
  .then(() => {
    console.log(" Connected to MongoDB");
  })
  .catch((err) => {
    console.error(" Connection error:", err);
  });

const sessionOptions = {
  secret: "mysupersecretecode", 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: 'lax', 
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
  }
};

app.use("/uploads", express.static("uploads"));


app.use(session(sessionOptions));

app.use("/posts",posts);
app.use("/user",users);
app.use("/auth",auths);
app.use("/admin",admins);
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = new ExpressError(400, err.message);
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    err = new ExpressError(400, "File size limit exceeded (Max 10MB)");
  }
  if (err.name === "MulterError") {
    err = new ExpressError(400, err.message);
  }
  if (err.name === "CastError") {
    err = new ExpressError(400, "Invalid ID format");
  }
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({
    success: false,
    error: message
  });
});

app.listen(PORT,()=>{
    console.log("server is listing to port 8080");
});