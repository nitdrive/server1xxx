var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
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


/* connect to MongoDB */
mongoose.connect(secrets.db,function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

/*User Registration Test Route*/
router.get('/register',function(req,res,next) {
       
	console.log('Registration Page Requested');	
		res.render('register');
        


});

/* POST user details to DB */
router.post('/register', function(req, res) {
    
    var firstName = req.body.firstName;
    var middleName = req.body.middleName;
    var lastName = req.body.lastName;
    var dob = req.body.dob;
   
    var uname = req.body.uname; 
    var passHash = hashUse.hash(req.body.cpass);
 
    var greScore = parseInt(req.body.greScore); 
    
                        var greQuantScore = parseInt(req.body.greQuantScore);
			var greVerbalScore = parseInt(req.body.greVerbalScore);
			var greAWAScore = parseInt(req.body.greAWAScore);
   
   var iltscore = req.body.iletsScore;
   var toefl = req.body.toeflScore;
   
   var iletsScore,iletsListeningScore,iletsReadingScore,iletsSpeakingScore,iletsWritingScore;
    if(!isNaN(iltscore))
    {
      //console.log("ILETS VALID"+iltscore);
	    iletsScore= parseFloat(req.body.iletsScore);
				 iletsListeningScore = parseFloat(req.body.iletsListeningScore);
				 iletsReadingScore = parseFloat(req.body.iletsReadingScore);
		                 iletsWritingScore = parseFloat(req.body.iletsWritingScore);
				 iletsSpeakingScore = parseFloat(req.body.iletsSpeakingScore);
    }
    else
    {
           console.log("ILETS score not mentioned! for user:"+firstName+" -- username:"+uname);
           
           
    }

  ///TOEFL VALIDATION
    var toeflScore,toeflListeningScore,toeflReadingScore,toeflWritingScore,toeflSpeakingScore;
    if(!isNaN(toefl))
    {
      //console.log("ILETS VALID"+iltscore);
	   toeflScore = parseInt(req.body.toeflScore);              
                        toeflListeningScore =parseInt(req.body.toeflListeningScore);
			toeflReadingScore =parseInt(req.body.toeflReadingScore);
			toeflWritingScore = parseInt(req.body.toeflWritingScore);
			toeflSpeakingScore = parseInt(req.body.toeflSpeakingScore);
    }
    else
    {
           console.log("TOEFL score not mentioned! for user:"+firstName+" -- username:"+uname);
           
           
    }

   


    var undergradGPA = parseFloat(req.body.undergradGPA);
    var undergradMajor = req.body.undergradMajor;
    var undergradCollege = req.body.undergradCollege;
    var undergradCollegeCity = req.body.undergradCollegeCity;
    var undergradCollegeState = req.body.undergradCollegeState;
    var undergradCollegeCountry = req.body.undergradCollegeCountry;

    var semesterIntended = req.body.semesterIntended;
    var majorIntended = req.body.majorIntended;
    var degreeExpected = req.body.degreeExpected;

    var email = req.body.email;
    var phno = req.body.phno;
    var city = req.body.city;
    var maddress = req.body.maddress;
    var district = req.body.district;
    var state = req.body.state;
    
    
   // {"c":[{"v":"Mushrooms","f":null},{"v":3,"f":null}]}
   // var jsonUserData = {"c": [{ "v": req.body.name,"f":null}, {"v": gre,"f":null}] };

    if(typeof uname != 'undefined' && typeof passHash != 'undefined')
    {
      
   
       var person_data = {
        
            //general details
	    firstName: firstName,
            middleName: middleName,
            lastName: lastName,
	    dob : dob,
          
            //username and password
	    uname: uname,
	    password: passHash,
            
            // score details
            greScore: greScore,
	      		 greQuantScore: greQuantScore,
	   		 greVerbalScore: greVerbalScore,
			 greAWAScore: greAWAScore,

            toeflScore:  toeflScore,
			 toeflListeningScore: toeflListeningScore,
			 toeflReadingScore: toeflReadingScore,
			 toeflWritingScore: toeflWritingScore,
			 toeflSpeakingScore: toeflSpeakingScore,
            
            iletsScore: iletsScore,
			 iletsListeningScore: iletsListeningScore,
			 iletsReadingScore : iletsReadingScore,
                         iletsWritingScore : iletsWritingScore,
			 iletsSpeakingScore: iletsSpeakingScore,
            
            //undergrad details
            undergradGPA: undergradGPA,
	    undergradMajor: undergradMajor,
	    undergradCollege: undergradCollege,
	    undergradCollegeCity: undergradCollegeCity,
	    undergradCollegeState: undergradCollegeState,
	    undergradCollegeCountry: undergradCollegeCountry,
 
            // grad details
	    semesterIntended: semesterIntended,
	    majorIntended: majorIntended, 
	    degreeExpected: degreeExpected,

	    //contact details
	    email: email,
	    phoneNumber: phno,
	    maddress: maddress,
	    city: city,
	    district: district,
	    state: state
	    //country: String
        };
	var person = new userModel(person_data);
        var rflag = {};
	person.save( function(error, data){
	    if(error){
                console.log(error);
                rflag = {"rflag":false};
		res.send(rflag);
  
	    }
	    else{
		 console.log("Registration Successful");
	        // res.json(data);
                 rflag = {"rflag":true};
                 res.send(rflag);
                  
	    }
	});
    }
    else
    {
             console.log("USERNAME OR PASSWORD UNDEFINED");
             res.send("Error: USERNAME OR PASSWORD UNDEFINED");
            
    }
});


/* Login User */
router.get('/login',function(req,res,next) {
	
	console.log('Login Page Requested');	
		res.render('login');


});

/* POST credentials and check with db */

router.post('/login', function(req, res, next) {
    
    var uname = req.body.uname; var password = req.body.password;
    if(typeof uname == 'undefined' && typeof password == 'undefined')
    {
       console.log("USERNAME OR PASSWORD UNDEFINED");
       //return;
       res.send("Error: USERNAME OR PASSWORD UNDEFINED");
    }
    if(typeof uname != 'undefined' && typeof password != 'undefined')
    {
	    userModel.find({'uname' : uname, 'password' : hashUse.hash(password)}, function (err, data) {
	    if (err) return next(err);
	    else{
			if(data.length == 0)
			{ 
				res.send("No Users found with that details "+"<a href='#/user/login'>Login</a>");
				console.log("Login Failed for username "+req.body.uname+" request sent from IP: "+req.ip);
			}
			else
			{
			
				console.log("Login Successful for username "+req.body.uname+" request sent from IP:: "+req.ip);
				/*res.render('loginSuccess',{
		                        title: 'User Login Successful',
		                        result: data
		                        });*/
                                res.json(data);
			
			}
		}
            
           });
    }	
         
           
});


/* GET /todos listing. */
router.get('/list', function(req, res, next) {
  userModel.find({},function (err, data) {
    if (err) return next(err);
    console.log("Response Length:"+data.length+" Host Ip:"+req.ip);
    /*res.locals.json = {"users":data};
			res.render('userdetails',{
                                title: 'User Details Template',
                                result: data
                                });*/
    //res.header("Access-Control-Allow-Origin", "*"); 
    res.json(data);
  });
});

/* GET /todos/id */
router.get('/search/:uname/:pass', function(req, res, next) {
  userModel.find({'uname' : req.params.uname, 'password' : hashUse.hash(req.params.pass)}, function (err, data) {
    if (err) return next(err);
    else{
		if(data.length == 0)
		{ 
			res.send("No Users found with that details");
			console.log("Response Length:"+data.length + " Pass:"+req.params.pass);
		}
		else
		{
			
			console.log("Response Length:"+data.length+" Pass:"+req.params.pass+" Passhash:"+hashUse.hash(req.params.pass));
			/*res.render('userdetails',{
                                title: 'User Details Template',
                                result: data
                                });*/
			res.json(data);
		}
	}
    	
  });
});

/* POST data */
 

router.get('/signup/:name/:uname/:password', function(req, res, next) {
	
        var passHash = hashUse.hash(req.params.password);
        var person_data = {
	    name: req.params.name,
	    uname: req.params.uname,
	    password: passHash
	};

	var person = new userModel(person_data);
	person.save( function(error, data){
	    if(error){
		res.json(error);
	    }
	    else{
		res.json(data);
	    }
	});
});

module.exports = router;
