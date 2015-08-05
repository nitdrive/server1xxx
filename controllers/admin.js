var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var adminModel = require('../models/admin');
var userModel = require('../models/user');
var hashUse = require('../cryptos/sha1');
var secrets = require('../config/secrets');
var json = require('express-json');


var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.use(json());       // to support JSON-encoded bodies
//router.use(express.urlencoded()); // to support URL-encoded bodies


/*/* connect to MongoDB 
mongoose.connect(secrets.db,function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});*/





/* Login User */
router.get('/login',function(req,res,next) {
	
	console.log('Login Page Requested');	
		res.send("************* ACCESS DENIED ************ <br> Error: Using GET to access admin login. <br> ******************************************");


});

/* POST credentials and check with db */

router.post('/login', function(req, res, next) {
    
    var uname = req.body.aid; var password = req.body.password;
    if(typeof uname == 'undefined' && typeof password == 'undefined')
    {
       console.log("USERNAME OR PASSWORD UNDEFINED");
       //return;
       res.send("Error: USERNAME OR PASSWORD UNDEFINED");
    }
    if(typeof uname != 'undefined' && typeof password != 'undefined')
    {
	    adminModel.find({'uname' : uname, 'password' : hashUse.hash(password)}, function (err, data) {
	    if (err) return next(err);
	    else{
			if(data.length == 0)
			{ 
                            var message = "Login failed for admin id: "+uname;
			    var errormessage = [{"message": message}];
                            data = errormessage;
                            
			    res.json(data);
				console.log("Login Failed for Admin with username "+req.body.aid+" and password "+req.body.password+" hash:"+hashUse.hash(password)+" request sent from IP: "+req.ip);
			}
			else
			{
			
				console.log("Login Successful for Admin with username "+req.body.aid+" request sent from IP:: "+req.ip);
				
                                res.json(data);
			
			}
		}
            
           });
    }	
         
           
});


/* GET /todos listing. */
router.get('/userlist', function(req, res, next) {
  userModel.find({},function (err, data) {
    if (err) return next(err);
    console.log("Request for userlist "+ "Serving list with length:"+data.length+" Host Ip:"+req.ip);
    
    res.json(data);
  });
});

/* GET /todos/id */
router.get('/search/:uname', function(req, res, next) {
  userModel.find({'uname' : req.params.uname},function (err, data) {
    if (err) return next(err);
    else{
		if(data.length == 0)
		{ 
			res.send("No Users found with that details");
			console.log("Response Length:"+data.length);
		}
		else
		{
			
			console.log("Response Length:"+data.length);
			
			res.json(data);
		}
	}
    	
  });
});


module.exports = router;
