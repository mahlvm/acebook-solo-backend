const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create)
router.get("/:ownerId", PostsController.GetPostOwnerData)
router.put("/:postId/like", PostsController.LikePost)
router.get("/:postId/likes", PostsController.LikePost)
router.delete("/", PostsController.Delete)

module.exports = router;
