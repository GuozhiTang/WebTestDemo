const express = require('express');
const router = express.Router();
const config = require('../config/database');

// To get all roles locally
router.post('/matrixtubecarrier', (req, res, next) => {
  // console.log(req.files); // List of the files
  // console.log(req.body); // request body, like email

  console.log(req.files);
  // let file = req.files.image;

  // file.mv(file.name, function(err, success) {
  //   return res.json({success: true});
  // });
});

module.exports = router;