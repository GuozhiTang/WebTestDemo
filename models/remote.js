/*
 * @Description: Backend model for Remote request
 * @Author: Guozhi Tang
 * @Date: 2019-08-26 11:03:19
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:06:37
 */
const request = require('request');
const dataServer = 'http://10.253.7.14:8000';

// Send all types of requests to data server
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