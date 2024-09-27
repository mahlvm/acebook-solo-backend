const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const cors = require("cors");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express();


app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7); 
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id; 
      next();
    }
  });
};


app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
app.use("/posts", tokenChecker, postsRouter);
app.use("/comments", tokenChecker, commentsRouter);


app.use((req, res, next) => {
  next(createError(404)); 
});


app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};


  res.status(err.status || 500).json({ message: 'server error' });
});

module.exports = app;
