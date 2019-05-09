const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const LabwareSpec = require('../models/labwareSpec');
const request = require('request');

router.get('/getlwarespec', (req, res, next) => {
  LabwareSpec.find((err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get LabwareSpecs!'});
    } else {
      res.json(lwarespec);
    }
  });
});

router.post('/addlwarespec', (req, res, next) => {
  let newLwarespec = new LabwareSpec({
    moduleName: req.body.moduleName,
    className: req.body.className,
    map_id: req.body.map_id,
    name: req.body.name,
    description: req.body.description,
    material: req.body.material,
    volume: req.body.volume,
    cat_num: req.body.cat_num,
    manufacturer: req.body.manufacturer,
    id: req.body.id
  });
  LabwareSpec.addLabwareSpec(newLwarespec, (err, lwarespec) => {
    if (err) {
      res.json({success: false, msg:'Failed to add LabwareSpecs!'});
    } else {
      res.json({success: true, msg:'Add LabwareSpecs successfully!'});
    }
  });
});

router.post('/grablabwareSpecs', (req, res, next) => {
  LabwareSpec.grabLabwareSpecs((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab LabwareSpecs!'});
      // console.log('Failed to grab specs!');
    } else {
      try {
        res.json({success: true, msg:'Grab LabwareSpecs successfully!'});
        // console.log(res);
        // console.log('Grab specs successfully!');
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

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