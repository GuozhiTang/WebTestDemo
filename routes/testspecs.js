const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const request = require('request');
const TestSpec = require('../models/testspec');

router.post('/grabtestspecs', (req, res, next) => {
  TestSpec.grabTestSpec((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab specs!'});
    } else {
      try {
        res.json({success: true, msg:'Grab Specs successfully!'});
      } catch (err) {
        res.end();
      }
    }
  });
});

module.exports = router;