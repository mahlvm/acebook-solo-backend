const bcrypt = require('bcrypt')
const User = require("../models/user");
const TokenGenerator = require('../models/token_generator');

const UsersController = {
  Index: (req, res) => {
    User.findById(req.user_id, (err, data) => {
      if (err) {
        res.status(400).json({message: 'Unable to find user'})
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({user: data, token: token});
      }
    })
  },

  Create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.status(409).json({message: 'Email address already exists'});
      } else {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            res.status(401).json({message: 'Password encryption error'})
          }
          else {
            req.body.password = hash;
            const user = new User(req.body);

            // Save the publicId for the avatar
            if (req.body.avatar) { 
              user.avatar = req.body.avatar; 
            }
            
            user.save((err) => {
            if (err) {
              res.status(400).json({message: 'Bad request'})
            } else {
              res.status(201).json({ message: 'OK' });
            }
            });
          }
        })
      }
    }) 
  },
  
  Delete: (req, res) => {
    User.deleteOne({_id: req.query.id}, (err, data) => {
      if (err) {
        res.status(400).json({message: 'Unable to delete user'})
      } else {
        res.status(200).json({message: 'User deleted'});
      }
    })
  },

  // Update: async (req, res) => {
  //   const currentUser = await User.findById(req.params.userId)

  //   if (req.file) currentUser.avatar = `/uploads/${req.file.filename}`

  //   currentUser.save((err) => {
  //     if (err) { res.status(400).json({ message: 'Bad request' }) }
  //     else { res.status(201).json({ message: 'OK' }) }
  //     });
  // },
  
  Update: async (req, res) => {
    try {
        // Encontrar o usuário atual pelo ID
        const currentUser = await User.findById(req.params.userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Atualiza o avatar se um novo arquivo for enviado
        if (req.file) {
            currentUser.avatar = `/uploads/${req.file.filename}`;
        }

        // Atualiza outros campos a partir do req.body
        // Use Object.assign ou a spread operator para atualizar
        Object.assign(currentUser, req.body);

        // Salva as alterações
        await currentUser.save();

        return res.status(200).json({ message: 'User updated successfully', user: currentUser });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Bad request', error: err.message });
    }
}
};

module.exports = UsersController;
