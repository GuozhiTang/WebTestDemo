const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Probemap = require('../models/probemap');
const request = require('request');

router.get('/getProbemaps', (req, res, next) => {
  Probemap.find((err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

router.post('/addProbemap', (req, res, next) => {
  let newProbemap = new Probemap({
    moduleName: req.body.moduleName,
    className: req.body.className,
    name: req.body.name,
    creator: req.body.creator,
    codemap_id: req.body.codemap_id,
    most_current: req.body.most_current,
    id: req.body.id
  });
  Probemap.addProbemap(newProbemap, (err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Probemaps!'});
    } else {
      res.json({success: true, msg:'Add Probemaps successfully!'});
    }
  });
});

router.post('/grabProbemaps', (req, res, next) => {
  Probemap.grabProbemaps((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab Probemaps!'});
    } else {
      try {
        res.json({success: true, msg:'Grab Probemaps successfully!'});
        // console.log(res);
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

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