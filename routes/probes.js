/*
 * @Description: Route configuration for Probes
 * @Author: Guozhi Tang
 * @Date: 2019-05-08 14:00:45
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:59:32
 */
const express = require('express');
const router = express.Router();
// Bring in our models
const Probe = require('../models/probe');

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

// @route  POST probes/showProbes
// @desc   To get and show all probes with specific probemap_id remotely
// @access Private
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