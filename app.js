var _ = require('lodash');
var asyncjs = require('async');
var nodeunit = require('nodeunit');
var db = require('./db');

const express = require('express');
const app = express() 

const hostname = '127.0.0.1';
const port = 3000;

/* disable caching */
app.disable('etag');

/* app.listen(port, [hostname], [backlog], [callback]) */
/*
app.listen(port, hostname, 511, () => { 
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('Calendar API Version 1.0.0');
});

/* handle any request thats ends in /api/teams */
var TeamsController = require(__root + 'Controllers/TeamsController');
app.use('/api/teams', TeamsController);


/*
var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);
*/
var AuthController = require(__root + 'Controllers/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;