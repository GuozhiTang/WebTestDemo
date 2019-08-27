const request = require('request');
const dataServer = 'http://10.253.7.14:8000';

module.exports.remoteData = function (remoteData, callback) {
  // console.log(retrievalData);
  request.post(dataServer, {
    json: remoteData
  }, (error, res, body) => {
    if (res && res.statusCode == 200) {
      // console.log(body);
      callback(error, body);
    }
  });
}