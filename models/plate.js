/*
 * @Description: Backend model for Plate
 * @Author: Guozhi Tang
 * @Date: 2019-04-19 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:04:54
 */
const mongoose = require('mongoose');

// Plate Schema
const PlateSchema = mongoose.Schema({
    // Attributes
    id: {
      type: Number
    },
    barcode: {
      type: Number
    },
    name: {
      type: String
    },
    coor: {
      type: String
    },
    volume: {
      type: String
    },
    description: {
      type: String
    },
});

// We want to use it outside
// model('the name of spec')
// module.exports so that it can be used outside this file
const Plate = module.exports = mongoose.model('Plate', PlateSchema);

// To get all plates
module.exports.getPlates = function (callback) {
  Plate.find(callback);
}

// Search by coor
module.exports.getByCoor = function(coor, callback) {
  const query = {coor: coor}
  Plate.find(query, callback);
}

// Search by barcode
module.exports.getByBarcode = function(barcode, callback) {
  const query = {barcode: barcode}
  Plate.find(query, callback);
}