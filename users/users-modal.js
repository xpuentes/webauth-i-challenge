const db = require('../database/dbConfig.js');

module.exports = {
  addUser: (newUser) => {
    return db('users').insert(newUser);
  },
  getUsers: () => {
    return db('users');
  }
}
