const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const trainingSchema = mongoose.Schema({
    training : [{
        title : String,
        completionYear : String,
        duration : String,
        file: String
         }]
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

