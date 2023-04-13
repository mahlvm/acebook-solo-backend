const Post = require("../models/post");
const Users = require("../models/user");
const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");

const CommentsController = {
  
  Create: async (req, res) => {
    const comment = await buildCommentData(req) // method further down

    comment.save(async (err) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  GetCommentsByPostId: async (req, res) => {
    const post = await Post.findById(req.params.postId);

    Comment.find({ postId: post }, async (err, data) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({comments: data, token: token });
    }).sort({ createdAt: 1 });
  },

  GetCommentOwnerData: (req, res) => {
    console.log('REQQQQQ', req.params)
    Users.findById(req.params.id, async (err, data) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({commentOwnerData: data, token: token });
    })
  },

  LikePost: async (req, res) => {
    try {
      const commentID = req.params.commentId;
      const userID = req.user_id;

      const comment = await Comment.findById(commentID);

      if (!comment.likes.includes(userID)) {
        comment.likes.push(userID);
        await comment.save();
      } else {
        comment.likes.pull(userID);
        await comment.save();
      }

      const updatedPost = await Comment.findById(commentID);
      const updatedLikes = updatedPost.likes.length;

      res.status(200).json({ message: "OK", likes: updatedLikes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

// HELPER METHODS -----------------

const findUser = (userId) => {
  return Users.findById(userId)
}

const retrieveImgData = (req) => {
  return {
    fileName: req.file.filename,
    contentType: req.file.mimetype,
  }
}

const buildCommentData = async (req) => {
  const comment = new Comment();
  const user = await findUser(req.user_id);
  const post = await Post.findById(req.params.postId);

  comment.createdBy = user
  comment.message = req.body.comment
  comment.postId = post
  if (req.file) { post.image = retrieveImgData(req) }
  return comment
}

module.exports = CommentsController;
