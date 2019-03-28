const db = require('../database/dbConfig.js');

module.exports = {
  addUser: (newUser) => {
    return db('users').insert(newUser);
  },
  findUser: (user) => {
    return db('users').where(user);
  },
  getUsers: () => {
    return db('users');
  }
}
