// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');

// Spec Schema
const InstrumentSchema = mongoose.Schema({
  // Attributes
  className: {
    type: String
  },
  moduleName: {
    type: String
  },
  short: {
    type: String
  },
  spec_id: {
    type: Object
  },
  id: {
    type: Number
  }
});

// We want to use it outside
// module.exports so that it can be used outside this file
const Instrument = module.exports = mongoose.model('Instrument', InstrumentSchema);

// To get all Instruments locally
module.exports.getInstrument = function (callback) {
  Instrument.find(callback);
}

// To add and save new Instrument locally
module.exports.addInstrument = function (newInstrument, callback) {
  newInstrument.save(callback);
}

// To pull Instruments remotely
module.exports.grabInstruments = function (callback) {
  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              id: "null",
              className: "Instrument",
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
        var grab = new Instrument(data[i]);
        grab.save(callback);
        // console.log(grab);
      }
    }
  })
}

// Search by moduleName
module.exports.getByModuleName = function(moduleName, callback) {
  const query = {moduleName: moduleName}
  Instrument.find(query, callback);
}

// Search by short
module.exports.getByShort = function(short, callback) {
  const query = {short: short}
  Instrument.find(query, callback);
}

// Search by instrument_id
module.exports.getById = function(id, callback) {
  const query = {id: id}
  Instrument.find(query, callback);
}

// Search by both moduleName and short
module.exports.getByConditions = function(moduleName, short, callback) {
  const query = {
    moduleName: moduleName,
    short: short
  }
  Instrument.find(query, callback);
}