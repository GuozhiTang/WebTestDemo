// All of our specs' routes
const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Probe = require('../models/probe');
const request = require('request');

// router.post('/showProbes', (req, res, next) => {
//   request.post('http://10.253.7.14:8000', {
//     json: {
//       request: "getProbemapProbe",
//       probemapId: 2834487
//     }
//   }, (error, response, body) => {
//     if (response && response.statusCode == 200) {
//       res.json(body)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ;
//       // console.log(body);
//     }
//   });
// });

router.post('/showProbes', (req, res, next) => {
  const mapId = req.body.mapId;

  Probe.showProbes(mapId, (err, probes, body) => {
    // console.log('err'+err);
    // console.log('probes'+probes);
    // console.log('body'+ body.length);
    if (err) {
      res.json({success: false, msg:'Failed to grab Probes!'});
    } else {
      try {
        res.json(probes);
        // console.log(probes.length);
      } catch (err) {
        res.end();
      }
    }
  }
  );
});

module.exports = router;