var app = require('./app');

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, 511, () => { 
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
var _ = require('lodash');
var asyncjs = require('async');
var nodeunit = require('nodeunit');
var db = require('./db.js');

const express = require('express');
const app = express() 

const hostname = '127.0.0.1';
const port = 3000;
*/

/* disable caching */
/*
app.disable('etag');
*/

/* app.listen(port, [hostname], [backlog], [callback]) */
/*
app.listen(port, hostname, 511, () => { 
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/