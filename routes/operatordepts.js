/*
 * @Description: Route configuration for OperatorDepts
 * @Author: Guozhi Tang
 * @Date: 2019-08-06 15:01:27
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:01:26
 */
const express = require('express');
const router = express.Router();
// Bring in our models
const OperatorDept = require('../models/operatordept');

// @route  GET operatordepts/getoperatordepts
// @desc   To get all OperatorDepts
// @access Private
router.get('/getoperatordepts', (req, res, next) => {
  OperatorDept.find((err, operatordept) => {
    if (err) {
      res.json({success: false, msg: 'Failed to get OperatorDepts!'});
    } else {
      res.json(operatordept);
    }
  });
});

// @route  POST operatordepts/addoperatordept
// @desc   To add and save new OperatorDepts locally
// @access Private
router.post('/addoperatordept', (req, res, next) => {
  let OperatorDept = new OperatorDept(req.body);
  OperatorDept.addOperatorDept(newOperatorDept, (err, operatordept) => {
    if (err) {
      res.json({success: false, msg: 'Failed to add operatordepts!'});
    } else {
      res.json({success: true, msg: 'Add operatordepts successfully!'});
    }
  });
});

// @route  POST operatordepts/resetoperatordepts
// @desc   1. Drop the current OperatorDept collection locally
// @desc   2. To pull OperatorDepts from remote server to local database
// @access Private
router.post('/resetoperatordepts', (req, res, next) => {
  OperatorDept.resetOperatorDepts((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset operatordepts!'});
    } else {
      try {
        res.json({success: true, msg: 'Reset operatordepts Successfully!'});
      } catch (err) {
        res.end();
      }
    }
  });
});

// // Search by name
// router.post('/searchbyname', (req, res, next) => {
//   const name = req.body.name;

//   Operator.getByName(name, (err, operator) => {
//     if (err) {
//       res.json({success: false, msg:'Failed to get operators!'});
//     } else {
//       res.json(operator);
//     }
//   });
// });

module.exports = router;