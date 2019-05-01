const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const trainingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completionYear: {
    type: String,
    required: false
  },
  duration: {
    type: String,
    required: false
  },
  file: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: false
  }
});

const Training = module.exports = mongoose.model('training', trainingSchema);

module.exports.getTrainingById = function(id, callback){
  Training.findById(id, callback);
}


module.exports.getTrainingByName = function(name, callback){
const query = {name: name}
Training.findOne(query, callback);
}

module.exports.addTraining = function(newTraining, callback){ 
      newTraining.save(callback);
}

