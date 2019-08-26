const express = require('express');
const router = express.Router();
// Bring in our models
const Remote = require('../models/remote');

router.post('/retrievalData', (req, res, next) => {
  const retrievalData = req.body;
  // console.log(req.body);
  Remote.retrievalData(retrievalData, (err, data) => {
    if (err) {
      res.json({success: false, msg:'Failed!'});
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
  const retrievalData = req.body;
  // console.log(req.body);
  Remote.createData(retrievalData, (err, data) => {
    if (err) {
      res.json({success: false, msg:'Failed!'});
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
  Remote.postReq(reqData, (err, data) => {
    if (err) {
      res.json({success: false, msg:'Failed!'});
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