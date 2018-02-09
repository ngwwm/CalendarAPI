var _ = require('lodash');
var asyncjs = require('async');
var nodeunit = require('nodeunit');
var db = require('./lib/jdbc-common');

db.mssqldb(function(err, mssqldb) {
      if (err) {
        console.log(err);
      } else {
        db.select(mssqldb, "select @@version as version;", function(err, resultset) {
          if (err) {
            console.log(err);
          } else {
            // Convert the result set to an object array.
            resultset.toObjArray(function(err, results) {
              if (results.length >0) {
                console.log("Data Source Initialized: " + results[0].version);
              }
            });
          }
        });
      }
});

function getTeams(callback) {
  db.mssqldb(function(err, mssqldb) {
      if (err) {
        console.log(err);
      } else {
        db.select(mssqldb, "select ID, Name, Description from Team;", function(err, resultset) {
          if (err) {
            console.log(err);
          } else {
            // Convert the result set to an object array.
            resultset.toObjArray(function(err, results) {
              if (err) {
                console.log(err);
              } else {
                if (results.length > 0) {
                  callback(err, results);
                }
              }
            });
          }
        });
      }
  });
}

const express = require('express');
const app = express() 

const hostname = '127.0.0.1';
const port = 3000;

/* disable caching */
app.disable('etag');

/* app.listen(port, [hostname], [backlog], [callback]) */
app.listen(port, hostname, 511, () => { 
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/api/teams', function (req, res) {
  getTeams(function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.set('Content-Type', 'application/json'); 
      res.send(JSON.stringify(results, null, 1));
      res.status(200);
    }
  });
});
