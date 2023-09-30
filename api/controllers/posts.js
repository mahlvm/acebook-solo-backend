const Post = require("../models/post");
const Users = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");

const PostsController = {

  Index: async (req, res) => {
    const user = await findUser(req.user_id)  // method further down

    Post.find(async (err, posts) => {
      if (err) { throw err }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)

      // console.log({ posts: posts, user: user, token: token });

      res.status(200).json({ posts: posts, user: user, token: token });
    }).sort({ createdAt: -1 });
  },

  Create: async (req, res) => {
    const post = await buildPostData(req) // method further down

    post.save(async (err) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  GetPostOwnerData: (req, res) => {
    Users.findById(req.params.ownerId, async (err, data) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ownerData: data, token: token });
    })
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

  Delete: (req, res) => {
    Post.deleteMany({createdBy: req.query.id}, (err, data) => {
      if (err) {
        res.status(400).json({message: 'Unable to delete posts'})
      } else {
        res.status(200).json({message: 'Posts deleted'});
      }
    })
  }

};


// HELPER METHODS -----------------

const findUser = (userId) => {
  return Users.findById(userId)
}

const buildPostData = async (req) => {
  const post = new Post();
  const user = await findUser(req.user_id)
  
  post.createdBy = user
  post.message = req.body.message
  post.image = req.body.publicID;

  return post
}

module.exports = PostsController;
