const mongoose = require('mongoose');
const request = require('request');

// Labware Schema
const LabwareSchema = mongoose.Schema({
  // Attributes
  className: {
    type: String
  },
  moduleName: {
    type: String
  },
  operator_id: {
    type: Object
  },
  created: {
    type: String
  },
  role_id: {
    type: Object
  },
  spec_id: {
    type: Object
  },
  barcode: {
    type: Number
  },
  id: {
    type: Number
  }
});

const Labware = module.exports = mongoose.model('Labware', LabwareSchema);

// To pull labwares data from data server
module.exports.grabLabwares = function (callback) {
  request.post('http://10.253.7.14:8000', {
    json: {
      request: "fireplexCoreDaoRetrieval",
      coreDaoReqData: {
          attrName: "id",
          colNames: ["id"],
          coreDao: {
              id: "null",
              barcode: "null",
              spec_id: {
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
              role_id: {
                id: "null",
                role: "null",
                liquid_class: "null",
                reagent: "null",
                className: "Role",
                moduleName: "fireplex.data.backend.core"
              },
              created: "null",
              operator_id: {
                id: "null",
                name: "null",
                active: "null",
                manufacturing: "null",
                admin: "null",
                className: "Operator",
                moduleName: "fireplex.data.backend.core"
              },
              className: "Labware",
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
        var grab = new Labware(data[i]);
        // grab.save(callback);
        console.log(grab);
      }
    }
  })
}