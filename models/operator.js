// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');

const OperatorSchema = mongoose.Schema({
  // Attributes
  moduleName: {
    type: String
  },
  className: {
    type: String
  },
  name: {
    type: String
  },
  admin: {
    type: Boolean
  },
  active: {
    type: Boolean
  },
  manufacturing: {
    type: Boolean
  },
  id: {
    type: Number
  }
});

const Operator = module.exports = mongoose.model('Operator', OperatorSchema);

// To get all Operators
module.exports.addOperator = function (newOperator, callback) {
  newOperator.save(callback);
}

// 1. Drop the current Operator collection locally
// 2. To pull Operators from remote server to local database
module.exports.resetOperators = function (callback) {
  mongoose.connection.collection("operators").drop(function(err) {
    console.log('Collection Dropped Firstly!');
  });

  request.post('http://10.253.7.14:8000', {
    json: {
      request: "getOperators"
    }
  }, (error, response, body) => {
    if (response && response.statusCode == 200) {
      // console.log("body: ", body);
      for (var i = 0; i < body.length; i++) {
        var grab = new Operator(body[i]);
        grab.save(callback);
        // console.log(grab);
      }
    }
  });
}


// Search by name
module.exports.getByName = function(name, callback) {
  const query = {name: name}
  Operator.find(query, callback);
}