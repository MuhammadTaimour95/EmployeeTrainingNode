const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const skillsSchema = mongoose.Schema({
    skills : [{
        name : String,
        experience : String
         }],
     userId: String     
});

const Skills = module.exports = mongoose.model('skills', skillsSchema);

module.exports.getSkillsById = function(id, callback){
    Skills.findById(id, callback);
}


module.exports.getSkillsByName = function(name, callback){
const query = {name: name}
Skills.findOne(query, callback);
}

module.exports.getSkillsByUserId = function(userId, callback){
    const query = {userId: userId}
    Skills.findOne(query, callback);
    }

module.exports.addSkills = function(newSkills, callback){ 
    console.log(newSkills);
      newSkills.save(callback);
}

