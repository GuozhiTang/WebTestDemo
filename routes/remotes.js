const express = require('express');
const router = express.Router();
// Bring in our models
const Remote = require('../models/remote');

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