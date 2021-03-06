/*
 * @Description: Backend model for Spec which is not used for now
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:07:22
 */
// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
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
    type: Number
  }
});

// We want to use it outside
// model('the name of spec')
// module.exports so that it can be used outside this file
const Spec = module.exports = mongoose.model('Spec', SpecSchema);

// To get all Specs
module.exports.getSpecs = function (callback) {
  Spec.find(callback);
}

// To add and save new Specs locally
module.exports.addSpec = function (newSpec, callback) {
      newSpec.save(callback);
}

// To pull Specs from data server to local database
module.exports.grabSpecsv1 = function (callback) {
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

// 1. Drop the current Spec collection locally
// 2. To pull Specs from remote server to local database
module.exports.resetSpecs = function (callback) {
  mongoose.connection.collection("specs").drop(function(err) {
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

// Search by name
module.exports.getByName = function(name, callback) {
  const query = {name: name}
  Spec.find(query, callback);
}

// Search by moduleName
module.exports.getByModuleName = function(moduleName, callback) {
  const query = {moduleName: moduleName}
  Spec.find(query, callback);
}

// Search by id
module.exports.getById = function(id, callback) {
  const query = {id: id}
  Spec.find(query, callback);
}

// Search by conditions
module.exports.getByConditions = function(name, moduleName, callback) {
  const query = {
    name: name,
    moduleName: moduleName
  }
  Spec.find(query, callback);
}