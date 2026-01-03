if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const posts = require("./routes/post.js");
const users = require("./routes/user.js");
const auths = require("./routes/auth.js");
const admins = require("./routes/admin.js");

const ExpressError = require("./utils/ExpressError.js");

const app = express();
const PORT = process.env.PORT || 8080;


app.set("trust proxy", 1);


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());


app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));


app.use("/posts", posts);
app.use("/user", users);
app.use("/auth", auths);
app.use("/admin", admins);


// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ success: false, error: message });
});


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
