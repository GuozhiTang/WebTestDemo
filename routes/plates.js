// All of our specs' routes
const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Plate = require('../models/plate');
const request = require('request');

router.get('/getplates', (req, res, next) => {
  // res.send('getplates');
  Plate.find((err, plate) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Plates'});
    } else {
      res.json(plate)
    }
  });
})

router.post('/searchbycoor', (req, res, next) => {
  const coor = req.body.coor;

  Plate.getByCoor(coor, (err, plate) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Plates!'});
    } else {
      res.json(plate);
    }
  });
});

module.exports = router;