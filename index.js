const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || '3000';
app.listen(port, function(){
  console.log(`Server started on port ${port}`);
})


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

// Connect
//const dbURI = 'mongodb://localhost:27017/mean';
const dbURI = 'mongodb://mwprojects:qqq111@ds147974.mlab.com:47974/mwprojects';
const connection = (closure) => {
  return MongoClient.connect(dbURI, (err, db) => {
    if (err) return console.log(err);
    closure(db);
  });
};


// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};


// Get all data
app.get('/all', (req, res) => {
  connection((db) => {
    db.collection('bucket-list')
      .find()
      .toArray()
      .then((users) => {
        let response = {
          status: 200,
          data: []
        };
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
          sendError(err, res);
      });
  });
});


// Try to log in
app.post('/login', (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  connection((db) => {
    db.collection('bucket-list')
      .find({
      	username: username,
      	password: password
      })
      .toArray()
      .then((result) => {
        let response = {
          status: 200,
          message: []
        };
        (result.length > 0) ? response.message = 'Login OK' : response.message = 'Login failed';
        res.json(response);
      })
      .catch((err) => {
          sendError(err, res);
      });
  });
});


// Get user data
app.post('/getuser', (req, res) => {
  let username = req.body.username;
  connection((db) => {
    db.collection('bucket-list')
      .find({
      	username: username
      })
      .toArray()
      .then((result) => {
        let response = {
          status: 200,
          data: []
        };
        response.data = result;
        res.json(response);
      })
      .catch((err) => {
          sendError(err, res);
      });
  });
});


// Create new user
app.post('/newuser', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  connection((db) => {
    db.collection('bucket-list')
    	.insertOne({
  	    "username": username,
  	    "password": password,
  	    "list": []
    	})
    	.then((users) => {
  			let response = {
  			  status: 200,
  			  message: 'User created'
  			};
  	    res.json(response);
    	})
    	.catch((err) => {
    	    sendError(err, res);
    	});
  });
});


// Check if username is free
app.post('/checkusername', (req, res) => {
  let username = req.body.username;
  connection((db) => {
    db.collection('bucket-list')
    	.find({
      	username: username
      })
      .toArray()
      .then((result) => {
        let response = {
          status: 200,
          message: ''
        };
        (result.length > 0) ? response.message = 'Username taken' : response.message = 'Username is free';
        res.json(response);
      })
      .catch((err) => {
          sendError(err, res);
      });
  });
});


// Delete user
app.post('/deleteuser', (req, res) => {
  let username = req.body.username;
  connection((db) => {
    db.collection('bucket-list')
    	.deleteOne({
        "username": username
      })
      .then((users) => {
    		let response = {
    		  status: 200,
    		  message: 'User deleted'
    		};
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


// Change password
app.post('/changepassword', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  connection((db) => {
    db.collection('bucket-list')
    	.updateOne({
    		"username": username
    	},
    	{
        $set: { "password": password }
      })
      .then((users) => {
    		let response = {
    		  status: 200,
    		  message: 'Password changed'
    		};
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


// Add new goal
app.post('/addgoal', (req, res) => {
  let username = req.body.username;
	let id = Math.random().toString().substr(2,10);
  let goal = req.body.goal;
  let dateAdded = req.body.dateAdded;
  connection((db) => {
    db.collection('bucket-list')
    	.update({
    		 	"username": username
    		},
    		{
    		 $push: {
    		   	"list": {
    		   		id: id,
  		      	goal: goal,
  		      	date_added: dateAdded,
  		      	done: false,
  		      	date_done: ""
    		   	}
    		 	}
    		})
      .then((result) => {
    		let response = {
    		  status: 200,
    		  message: 'Goal added'
    		};
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


// Delete existing goal
app.post('/deletegoal', (req, res) => {
  let username = req.body.username;
	let id = req.body.id;
  connection((db) => {
    db.collection('bucket-list')
    	.update({
    		 	"username": username
    		},
    		{
    			$pull: {
    		  	list: {id: id}
    		 	}
    		})
      .then((result) => {
    		let response = {
    		  status: 200,
    		  message: 'Goal deleted'
    		};
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


// Edit existing goal
app.post('/editgoal', (req, res) => {
  let username = req.body.username;
	let id = req.body.id;
	let goal = req.body.goal;
	let dateAdded = req.body.dateAdded;
	let done = req.body.done;
	let dateDone = req.body.dateDone;
  connection((db) => {
    db.collection('bucket-list')
    	.update({
    		 	"username": username,
    		 	"list.id": id
    		},
    		{
    			$set: {
    		  	"list.$.goal": goal,
    		  	"list.$.date_added": dateAdded,
    		  	"list.$.done": (done === 'true'),
    		  	"list.$.date_done": dateDone
    		 	}
    		})
      .then((result) => {
    		let response = {
    		  status: 200,
    		  message: 'Goal edited'
    		};
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


// Complete existing goal
app.post('/completegoal', (req, res) => {
  let username = req.body.username;
  let id = req.body.id;
  let goal = req.body.goal;
  let dateDone = req.body.dateDone;
  connection((db) => {
    db.collection('bucket-list')
      .update({
          "username": username,
          "list.id": id
        },
        {
          $set: {
            "list.$.done": true,
            "list.$.date_done": dateDone
          }
        })
      .then((result) => {
        let response = {
          status: 200,
          message: 'Goal completed'
        };
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});



/*
post		/login 						DONE
post		/getuser					DONE
post		/checkusername		DONE	
post		/newuser					DONE
post		/changepassword		DONE
post		/deleteuser				DONE	
post		/addgoal					DONE
post		/editgoal					DONE
post		/deletegoal				DONE
post    /completegoal     DONE
*/