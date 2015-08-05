var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  uname: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TestApp', TestAppSchema);
