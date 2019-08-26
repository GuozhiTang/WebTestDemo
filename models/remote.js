const request = require('request');
const dataServer = 'http://10.253.7.14:8000';

module.exports.retrievalData = function (retrievalData, callback) {
  // console.log(retrievalData);
  request.post(dataServer, {
    json: retrievalData
  }, (error, res, body) => {
    if (res && res.statusCode == 200) {
      // console.log(body);
      callback(error, body);
    }
  });
}

module.exports.createData = function (createData, callback) {
  // console.log(createData);
  request.post(dataServer, {
    json: createData
  }, (error, res, body) => {
    if (res && res.statusCode == 200) {
      // console.log(body);
      callback(error, body);
    }
  });
}

module.exports.postReq = function (reqData, callback) {
  // console.log(createData);
  request.post(dataServer, {
    json: reqData
  }, (error, res, body) => {
    if (res && res.statusCode == 200) {
      // console.log(body);
      callback(error, body);
    }
  });
}