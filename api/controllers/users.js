const bcrypt = require('bcrypt');
const User = require("../models/user");

const UsersController = {
  Index: (req, res) => {
    User.findById(req.user_id, (err, data) => {
      if (err) {
        return res.status(400).json({ message: 'Unable to find user' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ user: data, token: token });
      }
    });
  },

  Create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        return res.status(409).json({ message: 'Email address already exists' });
      } else {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            return res.status(401).json({ message: 'Password encryption error' });
          }
          req.body.password = hash;
          const user = new User(req.body);

          if (req.body.avatar) {
            user.avatar = req.body.avatar;
          }

          user.save((err) => {
            if (err) {
              return res.status(400).json({ message: 'Bad request' });
            } else {
              return res.status(201).json({ message: 'OK' });
            }
          });
        });
      }
    });
  },

  Delete: (req, res) => {
    User.deleteOne({ _id: req.query.id }, (err, data) => {
      if (err) {
        return res.status(400).json({ message: 'Unable to delete user' });
      } else {
        return res.status(200).json({ message: 'User deleted' });
      }
    });
  },

  Update: async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.file) {
        currentUser.avatar = `/uploads/${req.file.filename}`;
      }

      if (req.body.password) {
        const saltRounds = 10;
        currentUser.password = await bcrypt.hash(req.body.password, saltRounds);
      }

      if (req.body.email) {
        currentUser.email = req.body.email;
      }

      if (req.body.username) {
        currentUser.username = req.body.username;
      }

      await currentUser.save();

      return res.status(200).json({ message: 'User updated successfully', user: currentUser });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: 'Bad request', error: err.message });
    }
  }
};

module.exports = UsersController;
