const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    "SECRET_KEY",
    { expiresIn: "15m" }
  );
};

module.exports = generateToken;