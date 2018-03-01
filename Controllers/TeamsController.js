var express = require('express');
var router = express.Router();
var team = require(__root + 'Models/Team');
var VerifyToken = require('./VerifyToken');

function getTeams(callback) {
  __dbcontext.mssqldb(function(err, db) {
      if (err) {
        console.log(err);
      } else {
      	var sql = "select ID, Name, Description from Team;"
      	console.log("[Debug] " + sql);
        __dbcontext.select(db, sql, function(err, resultset) {
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

function getTeamsById(id, callback) {
  if (isNaN(id)) {
  	callback("Id is not a number");
  } else {
	  __dbcontext.mssqldb(function(err, db) {
	      if (err) {
	        callback(err);
	      } else {
	      	var sql = "select ID, Name, Description from Team Where ID=" + id + ";";
	      	console.log("[Debug] " + sql);
	        __dbcontext.select(db, sql, function(err, resultset) {
	          if (err) {
	            callback(err);
	          } else {          	
	            // Convert the result set to an object array.
	            resultset.toObjArray(function(err, results) {
	              if (err) {
	                callback(err);
	              } else {
	                if (results.length > 0) {
	                	callback(err, results);
	                } else {
						callback("No record found.");
	                }
	              }
	            });
	          }
	        });
	      }      
	  });
	}
}

router.get('/', VerifyToken, function (req, res) {	
	console.log('id:' + req.query.id);
	if (typeof req.query.id == 'undefined' || req.query.id == '') {
	  	getTeams(function (err, results) {
		    if (err) {
		      console.log(err);
		    } else {
		      res.set('Content-Type', 'application/json'); 
		      res.send(JSON.stringify(results, null, 1));
		      res.status(200);
		    }
		});
	} else {		
		getTeamsById(req.query.id, function (err, results) {
		    if (err) {
		      console.log(err);
		      res.set('Content-Type', 'application/json');       
		      res.send(JSON.stringify('{"Result": "Not found"}', null, 1));
		      res.status(404);
		    } else {
		      res.set('Content-Type', 'application/json'); 
		      res.send(JSON.stringify(results, null, 1));
		      res.status(200);
		    }			    
		});
	}
});

router.get('/:id', function (req, res) {
  	getTeamsById(req.params.id, function (err, results) {
    if (err) {
      console.log(err);
      res.set('Content-Type', 'application/json');       
      res.send(JSON.stringify('{"Result": "Not found"}', null, 1));
      res.status(404);
    } else {
      res.set('Content-Type', 'application/json'); 
      res.send(JSON.stringify(results, null, 1));
      res.status(200);
    }
  });
});


module.exports = router;