// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');

// Spec Schema
const ProbemapSchema = mongoose.Schema({
  // Attributes
  className: {
    type: String
  },
  moduleName: {
    type: String
  },
  name: {
    type: String
  },
  creator: {
    type: Object
  },
  codemap_id: {
    type: Object
  },
  most_current: {
    type: Number
  },
  id: {
    type: Number
  }
});

// We want to use it outside
// module.exports so that it can be used outside this file
const Probemap = module.exports = mongoose.model('Probemap', ProbemapSchema);

module.exports.getProbemaps = function (callback) {
  Probemap.find(callback);
}

module.exports.addProbemap = function (newProbemap, callback) {
  newProbemap.save(callback);
}

module.exports.grabProbemaps = function (callback) {
  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              id: "null",
              className: "Probemap",
              moduleName: "fireplex.data.backend.core"
          },
          dataRange: {},
          loadAll: "true"
      }
    }
  }, (error, response, body) => {
    if (response && response.statusCode == 200) {
      // console.log('body: ', body);
      var data = body.results;
      // console.log("data: ", data);
      // var dataObj = JSON.parse(data);
      for (var i = 0; i < data.length; i++) {
        // console.log('length ' + i + ': ' + data[i]);
        var grab = new Probemap(data[i]);
        grab.save(callback);
        // console.log(grab);
      }
    }
  })
}

module.exports.getByModuleName = function(moduleName, callback) {
  const query = {moduleName: moduleName}
  Probemap.find(query, callback);
}

module.exports.getByName = function(name, callback) {
  const query = {name: name}
  Probemap.find(query, callback);
}

module.exports.getById = function(id, callback) {
  const query = {id: id}
  Probemap.find(query, callback);
}

module.exports.getByConditions = function(moduleName, name, callback) {
  const query = {
    moduleName: moduleName,
    name: name
  }
  Probemap.find(query, callback);
}

module.exports.getByCreatorName = function(creatorName, callback) {
  const query = {'creator.requestor_id.name' : creatorName}
  Probemap.find(query, callback);
}