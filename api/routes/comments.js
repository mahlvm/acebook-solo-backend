const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");

router.get("/:postId", CommentsController.GetCommentsByPostId);
router.post("/:postId", CommentsController.Create);
router.get("/owner/:id", CommentsController.GetCommentOwnerData)
router.put("/:commentId/like", CommentsController.LikePost)
router.get("/:commentId/likes", CommentsController.LikePost)

module.exports = router;