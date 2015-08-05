// Load required packages
var mongoose = require('mongoose');
var secrets = require('../config/secrets');
var hashUse = require('../cryptos/sha1');
//console.log(hashUse);
// Define our admin schema
var AdminSchema = new mongoose.Schema({
 
  // Account Details
  Name: String,
 

  //username and password
  aid : String,
  password: String,

 
  created: { type: Date, default: new Date() }
  /*accessToken: { type: String, required: true },
  tokenSecret: { type: String, required: true }*/
},{collection: 'admindetails'});


// Export the Mongoose model
module.exports = mongoose.model('admindetails', AdminSchema);
