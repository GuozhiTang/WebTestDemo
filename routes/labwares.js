/*
 * @Description: Route configuration for Labwares
 * @Author: Guozhi Tang
 * @Date: 2019-04-11 14:00:45
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:01:49
 */
const express = require('express');
const router = express.Router();
// Bring in our models
const Labware = require('../models/labware');

// @route  POST labwares/grabLabwares
// @desc   To pull labwares data from data server
// @access Private
router.post('/grabLabwares', (req, res, next) => {
  Labware.grabLabwareSpecs((err, dataObj) => {
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