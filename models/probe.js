// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');

// Spec Schema
const ProbeSchema = mongoose.Schema({
  // Attributes
  className: {
    type: String
  },
  moduleName: {
    type: String
  },
  code: {
    type: Object
  },
  map_id: {
    type: Object
  },
  probe_id: {
    type: Object
  },
  label: {
    type: String
  },
  id: {
    type: Number
  }
});

// We want to use it outside
// module.exports so that it can be used outside this file
const Probe = module.exports = mongoose.model('Probe', ProbeSchema);

module.exports.showProbes = function (mapId, callback) {
  request.post('http://10.253.7.14:8000', {
    json: {
      request: "getProbemapProbe",
      probemapId: mapId
    }
  }, (error, response, body) => {
    if (response && response.statusCode == 200) {
      // console.log(body);
      callback(error, body);
    }
  });
}