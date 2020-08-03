var mongoose = require('mongoose'); 

//khoi tao 1 Schema
var userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  avatar: String
});

var User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
