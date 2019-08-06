const express = require('express');
const router = express.Router();
// Bring in our models
const Operator = require('../models/operator');

// To get all Operators
router.get('/getoperators', (req, res, next) => {
  Operator.find((err, operator) => {
    if (err) {
      res.json({success: false, msg: 'Failed to get Operators!'});
    } else {
      res.json(operator);
    }
  });
});

// To add and save new Operators locally
router.post('/addoperator', (req, res, next) => {
  let newOperator = new Operator(req.body);
  Operator.addOperator(newOperator, (err, operator) => {
    if (err) {
      res.json({success: false, msg: 'Failed to add operators!'});
    } else {
      res.json({success: true, msg: 'Add operators successfully!'});
    }
  });
});

// 1. Drop the current Operator collection locally
// 2. To pull Operators from remote server to local database
router.post('/resetOperators', (req, res, next) => {
  Operator.resetOperators((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset Operators!'});
    } else {
      try {
        res.json({success: true, msg: 'Reset Operators Successfully!'});
      } catch (err) {
        res.end();
      }
    }
  });
});

// Search by name
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