const express = require('express');
const router = express.Router();
// Bring in our models
const Instrument = require('../models/instrument');
 
// @route  GET instruments/getInstruments
// @desc   To get all Instruments locally
// @access Private
router.get('/getInstruments', (req, res, next) => {
  Instrument.find((err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Instruments!'});
    } else {
      res.json(instrument);
    }
  });
});

// @route  POST instruments/addInstrument
// @desc   To add and save new Instrument locally
// @access Private
router.post('/addInstrument', (req, res, next) => {
  let newInstrument = new Instrument(req.body);
  Instrument.addInstrument(newInstrument, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Instruments!'});
    } else {
      res.json({success: true, msg:'Add Instruments successfully!'});
    }
  });
});

// @route  POST instruments/resetInstruments
// @desc   1. Drop the current Instrument collection locally
// @desc   2. To pull Instruments from remote server to local database
// @access Private
router.post('/resetInstruments', (req, res, next) => {
  Instrument.resetInstruments((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset Instruments!'});
    } else {
      try {
        res.json({success: true, msg:'Reset Instruments successfully!'});
        // console.log(res);
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

// @route  POST instruments/searchbymoduleName
// @desc   Search by moduleName
// @access Private
router.post('/searchbymoduleName', (req, res, next) => {
  const moduleName = req.body.moduleName;

  Instrument.getByModuleName(moduleName, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Instruments!'});
    } else {
      res.json(instrument);
    }
  });
});

// @route  POST instruments/searchbyshort
// @desc   Search by short
// @access Private
router.post('/searchbyshort', (req, res, next) => {
  const short = req.body.short;

  Instrument.getByShort(short, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Instruments!'});
    } else {
      res.json(instrument);
    }
  });
});

// @route  POST instruments/searchbyid
// @desc   Search by instrument_id
// @access Private
router.post('/searchbyid', (req, res, next) => {
  const id = req.body.id;

  Instrument.getById(id, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Instruments!'});
    } else {
      res.json(instrument);
    }
  });
});

// @route  POST instruments/searchbyconditions
// @desc   Search by both moduleName and short
// @access Private
router.post('/searchbyconditions', (req, res, next) => {
  const moduleName = req.body.moduleName;
  const short = req.body.short;

  Instrument.getByConditions(moduleName, short, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Instruments!'});
    } else {
      res.json(instrument);
    }
  });
});

module.exports = router;