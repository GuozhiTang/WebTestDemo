// All of our specs' routes
const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const LabwareSpec = require('../models/labwareSpec');
const request = require('request');

router.post('/grablabwareSpecs', (req, res, next) => {
  LabwareSpec.grabLabwareSpecs((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab specs!'});
      // console.log('Failed to grab specs!');
    } else {
      try {
        res.json({success: true, msg:'Grab Specs successfully!'});
        // console.log(res);
        // console.log('Grab specs successfully!');
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

module.exports = router;