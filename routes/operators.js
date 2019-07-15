// All of our users' routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// Bring in our models
const Operator = require('../models/operator');

router.get('/getoperators', (req, res, next) => {
  Operator.find((err, operator) => {
    if (err) {
      res.json({success: false, msg: 'Failed to get Operators!'});
    } else {
      res.json(operator);
    }
  });
});

router.post('/addoperator', (req, res, next) => {
  let newOperator = new Operator({
    moduleName: req.body.moduleName,
    name: req.body.name,
    admin: req.body.admin,
    className: req.body.className,
    active: req.body.active,
    manufacturing: req.body.manufacturing,
    id: req.body.id
  });
  Operator.addOperator(newOperator, (err, operator) => {
    if (err) {
      res.json({success: false, msg: 'Failed to add operators!'});
    } else {
      res.json({success: true, msg: 'Add operators successfully!'});
    }
  });
});

router.post('/graboperators', (req, res, next) => {
  Operator.grabOperators((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab Operators!'});
    } else {
      try {
        res.json({success: true, msg: 'Grab Operators Successfully!'});
      } catch (err) {
        res.end();
      }
    }
  });
});

router.post('/searchbyname', (req, res, next) => {
  const name = req.body.name;

  Operator.getByName(name, (err, operator) => {
    if (err) {
      res.json({success: false, msg:'Failed to get operators!'});
    } else {
      res.json(operator);
    }
  });
});

module.exports = router;