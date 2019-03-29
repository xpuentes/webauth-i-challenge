const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
//const bcrypt = require('bcryptjs');
// const session = require('express-session');
const userRoutes = require('./routes/userRoutes');

const db = require('./database/dbConfig.js');
// const Users = require('./users/users-model.js');

const server = express();

// const sessionConfig = {
//   name: 'notsession', // default is connect.sid
//   secret: 'nobody tosses a dwarf!',
//   cookie: {
//     maxAge: 1 * 24 * 60 * 60 * 1000,
//     secure: false, // only set cookies over https. Server will not send back a cookie over http.
//   }, // 1 day in milliseconds
//   httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
//   resave: false,
//   saveUninitialized: false,
// };

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfig));
server.use('/api', userRoutes);
// server.post('/api/register', (req, res) => {
//   let newUser = req.body;
//   const hash = bcrypt.hashSync(newUser.password, 16);
//   newUser.password = hash;
//
//   Users.addUser(newUser)
//        .then(saved => {
//          res.status(201).json(saved);
//        })
//        .catch(err => {
//          res.status(500).json(err);
//        });
// });
//
// server.post('/api/login', (req, res) => {
//   let { username, password } = req.body;
//
//   Users.findUser({username})
//        .first()
//        .then(user => {
//          if(user && bcrypt.compareSync(password, user.password)){
//            req.session.username = user.username;
//            res.status(200).json({message: 'Logged in!'});
//          }
//          else{
//            res.status(401).json({message: 'You shall not PASS!'});
//          }
//        })
//        .catch(err => {
//          res.status(500).json(err);
//        });
// });
//
// server.get('/api/users', (req, res) => {
//   Users.getUsers()
//        .then(users => {
//          res.json(users);
//        })
//        .catch(err => {
//          res.status(500).json(err);
//        });
// });

const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
