const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {
});

server.post('/api/login', (req, res) => {
});

server.get('/api/users', (req, res) => {
});

const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
