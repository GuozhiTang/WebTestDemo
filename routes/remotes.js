const express = require('express');
const router = express.Router();
// Bring in our models
const Remote = require('../models/remote');

// @route  POST remotes/retrievalData
// @desc   To retrieval data from remote data server
// @access Private
router.post('/retrievalData', (req, res, next) => {
  const retrievalData = req.body;
  // console.log(req.body);
  Remote.remoteData(retrievalData, (err, data) => {
    if (err) {
      res.json({success: false, msg:'Failed to retrieval data from data server!'});
    } else {
      try {
        res.json(data);
      } catch (err) {
        res.end();
      }
    }
  });
});

// @route  POST remotes/createData
// @desc   To create data for remote data server
// @access Private
router.post('/createData', (req, res, next) => {
  const createData = req.body;
  // console.log(req.body);
  Remote.remoteData(createData, (err, data) => {
    if (err) {
      res.json({success: false, msg:'Failed to create data for data server!'});
    } else {
      try {
        res.json(data);
      } catch (err) {
        res.end();
      }
    }
  });
});

// @route  POST remotes/postReq
// @desc   To send post request with json data to remote data server
// @access Private
router.post('/postReq', (req, res, next) => {
  const reqData = req.body;
  // console.log(req.body);
  Remote.remoteData(reqData, (err, data) => {
    if (err) {
      res.json({success: false, msg:'Failed to do the post request to data server!'});
    } else {
      try {
        res.json(data);
      } catch (err) {
        res.end();
      }
    }
  });
});

module.exports = router;