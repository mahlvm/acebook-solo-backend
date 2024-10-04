const mongoose = require("mongoose");
const Users = require("./user");
const Post = require("./post");
const { ObjectID } = require("mongodb");

const CommentSchema = new mongoose.Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',  
    immutable: true,
  },
  message: { type: String },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    immutable: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});



const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;