const express = require("express");
const router = express.Router();
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const UsersController = require("../controllers/users");


const upload = require('../multerSetup')

router.get("/", UsersController.Index);
router.post("/", upload.single('profilePicture'), UsersController.Create);
router.put("/:userId", upload.single('profilePicture'), UsersController.Update);
router.delete("/", UsersController.Delete);
router.get("/avatar/:filename", UsersController.GetAvatar);
router.post("/:userId/add-friend/:friendId", UsersController.AddFriend);
router.get("/:userId/friends", UsersController.GetFriends);
router.get("/all", UsersController.GetAllUsers);
router.delete('/users/:userId/remove-friend/:friendId', UsersController.RemoveFriend);




module.exports = router;
