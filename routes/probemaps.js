/*
 * @Description: Route configuration for Probemaps
 * @Author: Guozhi Tang
 * @Date: 2019-05-08 14:00:45
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:00:35
 */
const express = require('express');
const router = express.Router();
// Bring in our models
const Probemap = require('../models/probemap');

// @route  GET probemaps/getProbemaps
// @desc   To get all probemaps locally
// @access Private
router.get('/getProbemaps', (req, res, next) => {
  Probemap.find((err, probemap) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Probemaps!'});
    } else {
      res.json(probemap);
    }
  });
});

// @route  POST probemaps/addProbemap
// @desc   To add and save new probemaps locally
// @access Private
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

// @route  POST probemaps/resetProbemaps
// @desc   1. Drop the current Probemap collection locally
// @desc   2. To pull Probemaps from remote server to local database
// @access Private
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

// @route  POST probemaps/searchbymoduleName
// @desc   Search by moduleName
// @access Private
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

// @route  POST probemaps/searchbyname
// @desc   Search by Name
// @access Private
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

// @route  POST probemaps/searchbyid
// @desc   Search by probemap_id
// @access Private
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

// @route  POST probemaps/searchbyconditions
// @desc   Search by both moduleName and name
// @access Private
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

// @route  POST probemaps/searchbycreatorname
// @desc   Search by creatorName
// @access Private
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