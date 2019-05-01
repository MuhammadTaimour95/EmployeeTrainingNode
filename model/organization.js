const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema


const organizationSchema = mongoose.Schema({
  organization : [{
      name : String,
      title : String,
      experience : String,
      fromDate : Date,
      toDate: Date
       }]   
});

const Organization = module.exports = mongoose.model('organization', organizationSchema);

module.exports.getOrganizationById = function(id, callback){
  Organization.findById(id, callback);
}


module.exports.getOrganizationByName = function(name, callback){
const query = {name: name}
Organization.findOne(query, callback);
}



module.exports.addOrganization = function(newOrganization, callback){ 
      newOrganization.save(callback);
}

