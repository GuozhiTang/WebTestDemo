const express = require('express');
const router = express.Router();
// Bring in our models
const Plate = require('../models/plate');

// @route  GET plates/getplates
// @desc   To get all plates
// @access Private
router.get('/getplates', (req, res, next) => {
  // res.send('getplates');
  Plate.find((err, plate) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Plates'});
    } else {
      res.json(plate)
    }
  });
})

// @route  POST plates/searchbycoor
// @desc   Search by coor
// @access Private
router.post('/searchbycoor', (req, res, next) => {
  const coor = req.body.coor;

  Plate.getByCoor(coor, (err, plate) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Plates!'});
    } else {
      res.json(plate);
    }
  });
});

// @route  POST plates/searchbybarcode
// @desc   Search by barcode
// @access Private
router.post('/searchbybarcode', (req, res, next) => {
  const barcode = req.body.barcode;

  Plate.getByBarcode(barcode, (err, barcode) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Plates!'});
    } else {
      res.json(barcode);
    }
  });
})

module.exports = router;