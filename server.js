
// With Express Middleware
var path = require('path');
var express = require('express');
var compression = require('compression');
var mongoose = require('mongoose');
json = require('express-json');

var app = express();

/*body parser*/
var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies



//load home module controller
var homeController = require('./controllers/home');

//load Mongoose user module controller
var userController = require('./controllers/user');
 
var adminController = require('./controllers/admin');





var oneDay = 86400000;

app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(compression({
  threshold: false
}));

app.use('/user',userController);
app.use('/admin',adminController);
//var router = userController;
var router = express.Router();
router.get('/', homeController.index);



// Login Route




app.use(router);
app.listen(3000);
