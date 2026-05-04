const Joi = require("joi");

exports.postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});