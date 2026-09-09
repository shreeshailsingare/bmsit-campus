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
const aiRoutes = require("./routes/ai");

const ExpressError = require("./utils/ExpressError.js");

const app = express();
const PORT = process.env.PORT || 8080;


app.set("trust proxy", 1);


const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  // origin:"http://localhost:5173",
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
app.use("/ai", aiRoutes); 


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

app.get("/", (req, res) => {
  res.send("BMSIT Campus Backend Running");
});
