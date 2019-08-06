const mongoose = require('mongoose');
const request = require('request');

const OperatorDeptSchema = mongoose.Schema({
  // Attributes
  moduleName: {
    type: String
  },
  className: {
    type: String
  },
  dept_spec: {
    type: Object
  },
  operator_id: {
    type: Object
  },
  enabled: {
    type: Boolean
  },
  id: {
    type: Number
  }
});

const OperatorDept = module.exports = mongoose.model('OperatorDept', OperatorDeptSchema);

// To get all OperatorDepts
module.exports.addOperatorDept = function (newOperatorDept, callback) {
  newOperatorDept.save(callback);
}

// 1. Drop the current OperatorDepts collection locally
// 2. To pull OperatorDepts from remote server to local database
module.exports.resetOperatorDepts = function (callback) {
  mongoose.connection.collection("OperatorDept").drop(function(err) {
    console.log('Collection Dropped Firstly!');
  });

  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              className: "OperatorDept",
              moduleName: "fireplex.data.backend.core"
          },
          dataRange: {},
          loadAll: "true"
        }
    }
  }, (error, response, body) => {
    if (response && response.statusCode == 200) {
      // console.log("body: ", body);
      var data = body.results;
      for (var i = 0; i < data.length; i++) {
        var grab = new OperatorDept(data[i]);
        grab.save(callback);
        // console.log(grab);
      }
    }
  });
}

// // Search by name
// module.exports.getByName = function(name, callback) {
//   const query = {name: name}
//   OperatorDept.find(query, callback);
// }