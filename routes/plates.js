const express = require('express');
const router = express.Router();
// Bring in our models
const Plate = require('../models/plate');

// To get all plates
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

// Search by coor
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

// Search by barcode
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