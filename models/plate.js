// create models for our specs, hold all the fields
// fields: types of fields, functions interacting with the database
const mongoose = require('mongoose');
const config = require('../config/database');
const request = require('request');

// Plate Schema
const PlateSchema = mongoose.Schema({
    // Attributes
    id: {
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

module.exports.getPlates = function (callback) {
  Plate.find(callback);
}

module.exports.getByCoor = function(coor, callback) {
  const query = {coor: coor}
  Plate.find(query, callback);
}