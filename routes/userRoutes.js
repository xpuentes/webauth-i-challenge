const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const router = express.Router();

router.use(express.json());

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findUser({username})
       .first()
       .then(user => {
         if(user && bcrypt.compareSync(password, user.password)){
           //req.session.username = user.username;
           res.status(200).json({message: 'Logged in!'});
         }
         else{
           res.status(401).json({message: 'You shall not PASS!'});
         }
       })
       .catch(err => {
         res.status(500).json(err);
       });
});

router.get('/users', (req, res) => {
  Users.getUsers()
       .then(users => {
         res.json(users);
       })
       .catch(err => {
         res.status(500).json(err);
       });
});

module.exports = router;
