const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hash
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.passwordHash);

  if (!valid) return res.status(401).send("Invalid password");

  const token = generateToken(user);

  res.json({ token });
};