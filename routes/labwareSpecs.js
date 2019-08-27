const express = require('express');
const router = express.Router();
// Bring in our models
const LabwareSpec = require('../models/labwareSpec');

// @route  GET labwareSpecs/getlwarespec
// @desc   To get all labwarespecs
// @access Private
router.get('/getlwarespec', (req, res, next) => {
  LabwareSpec.find((err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get LabwareSpecs!'});
    } else {
      res.json(lwarespec);
    }
  });
});

// @route  POST labwareSpecs/addlwarespec
// @desc   To add and save new labwarespecs locally
// @access Private
router.post('/addlwarespec', (req, res, next) => {
  let newLwarespec = new LabwareSpec(req.body);
  LabwareSpec.addLabwareSpec(newLwarespec, (err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to add LabwareSpecs!'});
    } else {
      res.json({success: true, msg:'Add LabwareSpecs successfully!'});
    }
  });
});

// @route  POST labwareSpecs/resetLabwareSpecs
// @desc   1. Drop the current LabwareSpec collection locally
// @desc   2. To pull LabwareSpecs from remote server to local database
// @access Private
router.post('/resetLabwareSpecs', (req, res, next) => {
  LabwareSpec.resetLabwareSpecs((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset LabwareSpecs!'});
      // console.log('Failed to grab specs!');
    } else {
      try {
        res.json({success: true, msg:'Reset LabwareSpecs successfully!'});
        // console.log(res);
        // console.log('Grab specs successfully!');
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

// @route  POST labwareSpecs/searchbyname
// @desc   Search by name
// @access Private
router.post('/searchbyname', (req, res, next) => {
  const name = req.body.name;

  LabwareSpec.getByName(name, (err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get LabwareSpecs!'});
    } else {
      res.json(lwarespec);
    }
  });
});

// @route  POST labwareSpecs/searchbymanufacturer
// @desc   Search by manufacturer
// @access Private
router.post('/searchbymanufacturer', (req, res, next) => {
  const manufacturer = req.body.manufacturer;

  LabwareSpec.getByManufacturer(manufacturer, (err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get LabwareSpecs!'});
    } else {
      res.json(lwarespec);
    }
  });
});

// @route  POST labwareSpecs/searchbyid
// @desc   Search by labwarespec_id
// @access Private
router.post('/searchbyid', (req, res, next) => {
  const id = req.body.id;

  LabwareSpec.getById(id, (err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get LabwareSpecs!'});
    } else {
      res.json(lwarespec);
    }
  });
});

// @route  POST labwareSpecs/searchbyconditions
// @desc   Search by name and manufacturer
// @access Private
router.post('/searchbyconditions', (req, res, next) => {
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;

  LabwareSpec.getByConditions(name, manufacturer, (err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get LabwareSpecs!'});
    } else {
      res.json(lwarespec);
    }
  });
});

module.exports = router;