const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use('/api', routes);

module.exports = server;