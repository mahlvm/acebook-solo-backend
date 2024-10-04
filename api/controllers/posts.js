const Post = require("../models/post");
const Users = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");

const PostsController = {

  Index: async (req, res) => {
    const user = await findUser(req.user_id)  

    Post.find(async (err, posts) => {
      if (err) { throw err }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)

      res.status(200).json({ posts: posts, user: user, token: token });
    }).sort({ createdAt: -1 });
  },

  Create: async (req, res) => {
    const post = await buildPostData(req) 

    post.save(async (err) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  // GetPostOwnerData: (req, res) => {
  //   Users.findById(req.params.ownerId, async (err, data) => {
  //     if (err) { throw err }

  //     const token = await TokenGenerator.jsonwebtoken(req.user_id)
  //     res.status(200).json({ownerData: data, token: token });
  //   })
  // },

  GetPostOwnerData: async (req, res) => {
    try {
      const userId = req.params.ownerId;
      

      const posts = await Post.find({ createdBy: userId }).sort({ createdAt: -1 });
  
      if (!posts) {
        return res.status(404).json({ message: 'No posts found for this user' });
      }
  
  
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
  
      res.status(200).json({ posts: posts, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  LikePost: async (req, res) => {
    try {
      const postID = req.params.postId;
      const userID = req.user_id;

      const post = await Post.findById(postID);
      if (!post.likes.includes(userID)) { post.likes.push(userID) }
      else { post.likes.pull(userID) }
      await post.save();

      const updatedPost = await Post.findById(postID);
      const updatedLikes = updatedPost.likes.length;

      res.status(200).json({ message: "OK", likes: updatedLikes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Delete: (req, res) => {
  //   Post.deleteMany({createdBy: req.query.id}, (err, data) => {
  //     if (err) {
  //       res.status(400).json({message: 'Unable to delete posts'})
  //     } else {
  //       res.status(200).json({message: 'Posts deleted'});
  //     }
  //   })
  // }

  Delete: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
  

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (post.createdBy.toString() !== req.user_id) {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }
  
      await Post.findByIdAndDelete(req.params.postId);
      return res.status(200).json({ message: 'Post deleted successfully' });
  
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  

};


// HELPER METHODS -----------------

const findUser = (userId) => {
  return Users.findById(userId)
}

const buildPostData = async (req) => {
  const post = new Post();
  const user = await findUser(req.user_id);
  
  post.createdBy = user._id;  
  post.message = req.body.message;
  post.image = req.body.publicID;
  post.username = user.username;  
  post.avatar = user.avatar;  

  return post
}

module.exports = PostsController;
