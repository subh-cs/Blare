const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const { tokenGenerate } = require("./controller/generateToken");
const { auth } = require("./controller/auth");
const { follow, unFollow } = require("./controller/followUnfollow");
const { userProfile } = require("./controller/userProfile");
const { createPost } = require("./controller/createPost");
const { deletePost } = require("./controller/deletePost");
const { likePost, disLikePost } = require("./controller/likeDislike");
const { commentPost } = require("./controller/commentPost");
const { getSinglePost } = require("./controller/getSinglePost");
const { getAllPosts } = require("./controller/getAllPosts");
// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });
// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", instructions: "Please read the README.md file" });
});

// app.get("/allPosts", auth, async (req, res) => {
//   let posts = await Post.find();
//   res.json(posts);
// });

// app.get("/allUsers", auth, (req, res) => {
//   User.find({}).then((users) => {
//     res.json(users);
//   });
// });

app.use("/api/authenticate", tokenGenerate);
app.post("/api/follow/:id", auth, follow);
app.post("/api/unfollow/:id", auth, unFollow);
app.get("/api/users", auth, userProfile);
app.post("/api/posts", auth, createPost);
app.delete("/api/posts/:id", auth, deletePost);
app.post("/api/posts/like/:id", auth, likePost);
app.post("/api/posts/unlike/:id", auth, disLikePost);
app.post("/api/posts/comment/:id", auth, commentPost);
app.get("/api/posts/:id", auth, getSinglePost);
app.get("/api/all_posts", auth, getAllPosts);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
