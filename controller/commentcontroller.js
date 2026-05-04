const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    postId: req.params.postId,
    userId: req.user.id,
    comment: req.body.comment
  });

  res.json(comment);
};