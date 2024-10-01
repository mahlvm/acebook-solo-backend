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
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  Delete: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const userId = req.user_id; // Supondo que o userId vem do token após a autenticação

      // Busca o comentário pelo ID
      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Verifica se o usuário é o autor do comentário
      if (comment.createdBy.toString() !== userId) {
        return res.status(403).json({ message: "You are not authorized to delete this comment" });
      }

      // Deleta o comentário se o usuário for o autor
      await Comment.findByIdAndDelete(commentId);

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to delete comment", error: err });
    }
  },


  // Delete: (req, res) => {
  //   Comment.deleteMany({createdBy: req.query.id}, (err, data) => {
  //     if (err) {
  //       res.status(400).json({message: 'Unable to delete comments'})
  //     } else {
  //       res.status(200).json({message: 'Comments deleted'});
  //     }
  //   })
  // }
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
  const user = await findUser(req.user_id);  // Busca o usuário pelo ID
  const post = await Post.findById(req.params.postId);  // Busca o post

  const comment = new Comment({
    createdBy: user._id,  // Salva o ID do usuário
    username: user.username,  // Salva o nome de usuário
    avatar: user.avatar,  // Salva o avatar do usuário
    message: req.body.comment,  // Salva o comentário
    postId: post._id,  // Associa ao post
  });

  return comment;
}

module.exports = CommentsController;
