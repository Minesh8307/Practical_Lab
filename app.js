const express = require("express");
const app = express();

const limiter = require("./middleware/rateLimiter");

app.use(express.json());
app.use(limiter);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

module.exports = app;