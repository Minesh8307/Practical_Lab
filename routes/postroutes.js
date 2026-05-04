const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createPost,
  deletePost,
  getPosts,
  getTrendingPosts
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.get("/", getPosts);
router.get("/trending", getTrendingPosts);

module.exports = router;