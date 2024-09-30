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

// Mostrar amigos de um usuário específico
router.get("/:userId/friends", UsersController.GetFriends);

// Listar todos os usuários
router.get("/all", UsersController.GetAllUsers);


module.exports = router;
