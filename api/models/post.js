const mongoose = require("mongoose");
const Users = require("./user");
const { ObjectID } = require("mongodb");

const PostSchema = new mongoose.Schema({
  message: { type: String },
  image: { type: String },
  createdBy: { 
    type: ObjectID,
    ref: 'Users',
    immutable: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  likes: [{
    type: ObjectID,
    ref: 'Users',
  }],
  comments: {
    type: Number,
    default: 0,
  },
  username: {  // Novo campo
    type: String,
    required: true,
  },
  avatar: {  // Novo campo
    type: String,
    required: true,
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
