const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const allowedUsersSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

const allowedUsers = module.exports = mongoose.model('allowedUsers', allowedUsersSchema);

module.exports.getUserById = function(id, callback){
  allowedUsers.findById(id, callback);
}


module.exports.getUserByEmail = function(email, callback){
const query = {email: email}
allowedUsers.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){ 
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }