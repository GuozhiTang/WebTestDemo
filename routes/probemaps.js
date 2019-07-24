const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Probemap = require('../models/probemap');

// To get all probemaps locally
router.get('/getProbemaps', (req, res, next) => {
  Probemap.find((err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

// To add and save new probemaps locally
router.post('/addProbemap', (req, res, next) => {
  let newProbemap = new Probemap(req.body);
  Probemap.addProbemap(newProbemap, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Probemaps!'});
    } else {
      res.json({success: true, msg:'Add Probemaps successfully!'});
    }
  });
});

// 1. Drop the current Probemap collection locally
// 2. To pull Probemaps from remote server to local database
router.post('/resetProbemaps', (req, res, next) => {
  Probemap.resetProbemaps((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset Probemaps!'});
    } else {
      try {
        res.json({success: true, msg:'Reset Probemaps successfully!'});
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

  Probemap.getByModuleName(moduleName, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

// Search by Name
router.post('/searchbyname', (req, res, next) => {
  const name = req.body.name;

  Probemap.getByName(name, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

// Search by probemap_id
router.post('/searchbyid', (req, res, next) => {
  const id = req.body.id;

  Probemap.getById(id, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

// Search by both moduleName and name
router.post('/searchbyconditions', (req, res, next) => {
  const moduleName = req.body.moduleName;
  const name = req.body.name;

  Probemap.getByConditions(moduleName, name, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

// Search by creatorName
router.post('/searchbycreatorname', (req, res, next) => {
  const creatorName = req.body.creatorName;

  Probemap.getByCreatorName(creatorName, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

module.exports = router;