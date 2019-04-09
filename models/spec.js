// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const request = require('request');

// Spec Schema
const SpecSchema = mongoose.Schema({
  // Attributes
  className: {
    type: String
  },
  moduleName: {
    type: String
  },
  description: {
    type: String
  },
  name: {
    type: String
  },
  id: {
    type: String
  }
});

// We want to use it outside
// model('the name of spec')
// module.exports so that it can be used outside this file
const Spec = module.exports = mongoose.model('Spec', SpecSchema);

module.exports.getSpecs = function (callback) {
  Spec.find(callback);
}

// create the addUser() function, especially the password hash part
module.exports.addSpec = function (newSpec, callback) {
      newSpec.save(callback);
}

module.exports.grabspecs = function (callback) {
  request('http://10.253.7.14:8000/?request=getSpecs', function (error, response, body) {
    if (response && response.statusCode == 200) {
      var data = body;
      var dataObj = JSON.parse(data);
      for (var i = 0; i < dataObj.length; i++) {
        // console.log('length' + i);
        var grab = new Spec(dataObj[i]);
        grab.save(callback);
      }
    }
  })
}

module.exports.getByName = function(name, callback) {
  const query = {name: name}
  Spec.find(query, callback);
}

module.exports.getByModuleName = function(moduleName, callback) {
  const query = {moduleName: moduleName}
  Spec.find(query, callback);
}

module.exports.getById = function(id, callback) {
  const query = {id: id}
  Spec.find(query, callback);
}

module.exports.getByConditions = function(name, moduleName, callback) {
  const query = {
    name: name,
    moduleName: moduleName
  }
  Spec.find(query, callback);
}