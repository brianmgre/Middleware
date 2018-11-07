const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const gatekeeper = require('../gatekeeper/gatekeeperMiddleware.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


// function gatekeeper(req, res, next) {
//     if (req.query.pass === 'mellon') {
//         console.log('welcome travelers');

//         req.welcomeMessage = 'welcome to the mines of Moria'
//         next();
//     } else {
//         res.send('you shall not pass!');
//     }
// }

// server.use(gatekeeper);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/secret', gatekeeper, (req, res) => {
    res.send(req.welcomeMessage)
})

module.exports = server;