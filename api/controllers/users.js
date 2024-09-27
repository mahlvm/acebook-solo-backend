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

  GetAvatar: (req, res) => {
    const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'Api', 'upload', filename); // Caminho ajustado

  // Verifica se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Envia o arquivo como resposta
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(err.status || 500).json({ message: 'Error sending file' });
      }
    });
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
  
          const newUser = new User(req.body);
  
          // Verifique se um arquivo foi enviado e atribua o avatar
          if (req.file) {
            newUser.avatar = `/uploads/${req.file.filename}`; // Ajuste o caminho conforme necessário
          }
  
          newUser.save((err) => {
            if (err) {
              return res.status(400).json({ message: 'Bad request', error: err.message });
            } else {
              return res.status(201).json({ message: 'User created successfully', user: newUser });
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

        // Atualiza a imagem se um novo arquivo foi enviado
        if (req.file) {
            currentUser.avatar = `/uploads/${req.file.filename}`; // Corrigido aqui
        }

        // Atualiza a senha se fornecida
        if (req.body.password) {
            const saltRounds = 10;
            currentUser.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        // Atualiza email e nome de usuário se fornecidos
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