const express = require('express');
const router = express.Router();
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
  let newInstrument = new Instrument(req.body);
  Instrument.addInstrument(newInstrument, (err, instrument) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Instruments!'});
    } else {
      res.json({success: true, msg:'Add Instruments successfully!'});
    }
  });
});

// 1. Drop the current Instrument collection locally
// 2. To pull Instruments from remote server to local database
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