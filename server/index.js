const express = require('express');
const cors = require('cors')
const routes = require('./routes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:false}));


server.use('/api', routes);

server.use(notFound)
server.use(errorHandler)

module.exports = server;