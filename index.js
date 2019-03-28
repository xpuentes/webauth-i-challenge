const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-modal.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 16);
  newUser.password = hash;

  Users.addUser(newUser)
       .then(saved => {
         res.status(201).json(saved);
       })
       .catch(err => {
         res.status(500).json(err);
       });
});

server.post('/api/login', (req, res) => {
});

server.get('/api/users', (req, res) => {
  Users.getUsers()
       .then(users => {
         res.json(users);
       })
       .catch(err => {
         res.status(500).json(err);
       });
});

const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
