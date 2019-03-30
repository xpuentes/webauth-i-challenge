const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Users = require('../users/users-model');
const restricted = require('../routes/restricted-middleware');
const router = express.Router();

const sessionConfig = {
  name: 'notsession', // default is connect.sid
  secret: 'nobody tosses a dwarf!',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false, // only set cookies over https. Server will not send back a cookie over http.
  }, // 1 day in milliseconds
  httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
  resave: false,
  saveUninitialized: false,
};

router.use(session(sessionConfig));

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

  Users.findUser({ username })
       .first()
       .then(user => {
         if(user && bcrypt.compareSync(password, user.password)){
           req.session.user = user;
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

router.get('/users', restricted, (req, res) => {
  Users.getUsers()
       .then(users => {
         res.json(users);
       })
       .catch(err => {
         res.status(500).json(err);
       });
});

router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res.send('Unable to logout!');
      }
      else{
        res.send('You have logged out!')
      }
    });
  }
  else{
    res.end();
  }
});

module.exports = router;
