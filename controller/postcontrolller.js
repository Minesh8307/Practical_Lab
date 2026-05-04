const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.createPost = async (req, res) => {
  const exists = await Post.findOne({ title: req.body.title });

  if (exists) return res.status(400).send("Duplicate title");

  const post = await Post.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.userId.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).send("Not allowed");
  }

  await post.deleteOne();
  res.send("Deleted");
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().lean();
  const comments = await Comment.find();

  const result = posts.map(post => ({
    ...post,
    comments: comments.filter(c => c.postId.toString() === post._id.toString())
  }));

  res.json(result);
};

exports.getTrendingPosts = async (req, res) => {
  const posts = await Post.find().lean();
  const comments = await Comment.find();

  const count = {};

  comments.forEach(c => {
    count[c.postId] = (count[c.postId] || 0) + 1;
  });

  const trending = posts.sort(
    (a, b) => (count[b._id] || 0) - (count[a._id] || 0)
  );

  res.json(trending);
};