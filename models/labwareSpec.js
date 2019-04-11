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

const LabwareSpec = module.exports = mongoose.model('LabwareSpec', LabwareSpecSchema);

module.exports.grabLabwareSpecs = function (callback) {
  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              id: "null",
              name: "null",
              description: "null",
              map_id: {
                id: "null",
                name: "null",
                description: "null",
                className: "Map",
                moduleName: "fireplex.data.backend.core"
              },
              volume: "null",
              material: "null",
              cat_num: "null",
              manufacturer: "null",
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