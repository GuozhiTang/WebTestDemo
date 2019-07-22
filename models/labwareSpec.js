// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');

// Spec Schema
const LabwareSpecSchema = mongoose.Schema({
  // Attributes
  className: {
    type: String
  },
  moduleName: {
    type: String
  },
  map_id: {
    type: Object
  },
  volume: {
    type: Number
  },
  material: {
    type: String
  },
  cat_num: {
    type: String
  },
  manufacturer: {
    type: String
  },
  description: {
    type: String
  },
  name: {
    type: String
  },
  id: {
    type: Number
  }
});

// We want to use it outside
// module.exports so that it can be used outside this file
const LabwareSpec = module.exports = mongoose.model('LabwareSpec', LabwareSpecSchema);

// To get all labwarespecs
module.exports.getLabwareSpec = function (callback) {
  LabwareSpec.find(callback);
}

// To add and save new labwarespecs locally
module.exports.addLabwareSpec = function (newLabwareSpec, callback) {
  newLabwareSpec.save(callback);
}

// To pull labwarespecs remotely
module.exports.resetLabwareSpecs = function (callback) {
  mongoose.connection.collection("labwarespecs").drop(function(err) {
    console.log('Collection Dropped Firstly!');
  });

  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              id: "null",
              className: "LabwareSpec",
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
        var grab = new LabwareSpec(data[i]);
        grab.save(callback);
        // console.log(grab);
      }
    }
  })
}

// Search by name
module.exports.getByName = function(name, callback) {
  const query = {name: name}
  LabwareSpec.find(query, callback);
}

// Search by manufacturer
module.exports.getByManufacturer = function(manufacturer, callback) {
  const query = {manufacturer: manufacturer}
  LabwareSpec.find(query, callback);
}

// Search by labwarespec_id
module.exports.getById = function(id, callback) {
  const query = {id: id}
  LabwareSpec.find(query, callback);
}

// Search by name and manufacturer
module.exports.getByConditions = function(name, manufacturer, callback) {
  const query = {
    name: name,
    manufacturer: manufacturer
  }
  LabwareSpec.find(query, callback);
}