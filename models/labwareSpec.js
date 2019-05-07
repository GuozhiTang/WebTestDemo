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

module.exports.getLabwareSpec = function (callback) {
  LabwareSpec.find(callback);
}

module.exports.addLabwareSpec = function (newLabwareSpec, callback) {
  newLabwareSpec.save(callback);
}

module.exports.grabLabwareSpecs = function (callback) {
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

module.exports.getByName = function(name, callback) {
  const query = {name: name}
  LabwareSpec.find(query, callback);
}

module.exports.getByManufacturer = function(manufacturer, callback) {
  const query = {manufacturer: manufacturer}
  LabwareSpec.find(query, callback);
}

module.exports.getById = function(id, callback) {
  const query = {id: id}
  LabwareSpec.find(query, callback);
}

module.exports.getByConditions = function(name, manufacturer, callback) {
  const query = {
    name: name,
    manufacturer: manufacturer
  }
  LabwareSpec.find(query, callback);
}