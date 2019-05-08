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
//       res.json(body);
//       // console.log(body);
//     }
//   });
// });

module.exports = router;