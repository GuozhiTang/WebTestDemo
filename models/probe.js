/*
 * @Description: Backend model for Probe
 * @Author: Guozhi Tang
 * @Date: 2019-05-08 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:06:21
 */
const mongoose = require('mongoose');
const request = require('request');

// Probe Schema
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

// To get and show all probes with specific probemap_id remotely
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