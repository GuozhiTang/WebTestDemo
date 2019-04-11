// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');
const Spec = require('./spec');

// newSpec Schema
const TestSpecSchema = mongoose.Schema({
  // Attributes
  request: {
    type: String
  },
  colNames: {
    type: Array
  },
  coreDao: {
    type: Object
  },
  dataRange: {
    type: Object
  },
  loadAll: String
});

const TestSpec = module.exports = mongoose.model('TestSpec', TestSpecSchema);

module.exports.grabTestSpec = function (callback) {
  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              id: "null",
              className: "Spec",
              moduleName: "fireplex.data.backend.core"
          },
          dataRange: {},
          loadAll: "true"
      }
    }
  }, (error, response, body) => {
    if (response && response.statusCode == 200) {
      // console.log('body: ', body);
      // var strbody = JSON.stringify(body.results);
      var data = body.results;
      // console.log("data: ", data);
      // console.log('strbody: ', strbody);
      // var data = body;
      // var dataObj = JSON.parse(data);
      for (var i = 0; i < data.length; i++) {
        // console.log('length ' + i + ': ' + data[i]);
        var grab = new Spec(data[i]);
        grab.save(callback);
        console.log(grab);
      }
    }
    // console.log('error: ', error);
    // console.log('statusCode: ', response && response.statusCode);
    // console.log('body: ', body);
  })
}