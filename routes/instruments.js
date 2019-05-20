const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Instrument = require('../models/instrument');

// To get all Instruments locally
router.get('/getInstruments', (req, res, next) => {
  Instrument.find((err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Instruments!'});
    } else {
      res.json(instrument);
    }
  });
});

// To add and save new Instrument locally
router.post('/addInstrument', (req, res, next) => {
  let newInstrument = new Instrument({
    moduleName: req.body.moduleName,
    className: req.body.className,
    short: req.body.short,
    spec_id: req.body.spec_id,
    id: req.body.id
  });
  Instrument.addInstrument(newInstrument, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Instruments!'});
    } else {
      res.json({success: true, msg:'Add Instruments successfully!'});
    }
  });
});

// To pull Instruments remotely
router.post('/grabInstruments', (req, res, next) => {
  Instrument.grabInstruments((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab Instruments!'});
    } else {
      try {
        res.json({success: true, msg:'Grab Instruments successfully!'});
        // console.log(res);
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

// Search by moduleName
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

// Search by short
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

// Search by instrument_id
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

// Search by both moduleName and short
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