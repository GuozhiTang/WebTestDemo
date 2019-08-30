/*
 * @Description: Route configuration for Operators
 * @Author: Guozhi Tang
 * @Date: 2019-07-15 14:00:45
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:01:10
 */
const express = require('express');
const router = express.Router();
// Bring in our models
const Operator = require('../models/operator');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');

// @route  GET operators/getoperators
// @desc   To get all Operators
// @access Private
router.get('/getoperators', (req, res, next) => {
  Operator.find((err, operator) => {
    if (err) {
      res.json({success: false, msg: 'Failed to get Operators!'});
    } else {
      res.json(operator);
    }
  });
});

// @route  POST operators/addoperator
// @desc   To add and save new Operators locally
// @access Private
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

// @route  POST operators/resetOperators
// @desc   1. Drop the current Operator collection locally
// @desc   2. To pull Operators from remote server to local database
// @access Private
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

// @route  POST operators/searchbyname
// @desc   Search by name
// @access Private
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

// @route  POST operators/authenticate
// @desc   To authenticate that whether the login operator has same information with exusted one.
// @access Private
router.post('/authenticate', (req, res, next) => {
  // res.send('AUTHENTICATE');
  const name = req.body.name;
  
  Operator.getByName(name, (err, operator) => {
    // console.log(operator[0].name);
    if (err) {
      res.json({success: false, msg:'Error exists for authentication!'});
    } else if (!operator) {
      res.json({success: false, msg:'Operator not found!'});
    } else if (operator[0].name != name) {
      res.json({success: false, msg:'Name not exists in database!'});
    } else if (operator[0].name == name) {
      const token = jwt.sign({data: operator[0]}, config.secret, {
        expiresIn: 604800 // One week
      });

      res.json({
        success: true,
        token: 'JWT ' + token,
        operator: {
          id: operator[0]._id,
          name: operator[0].name
        },
        msg:'Login Successfully!'
      });
    }
  });
});

// @route  GET operators/profile
// @desc   one of the routes we will protect with our aithenticate with our token
// @access Private
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // res.send('PROFILE');
  // res.json({msg: "success profile"});
  res.json({operator: req.user});
  // console.log(req.user);
});

// @route  GET operators/nulloperator
// @desc   To handle the case of null operator
// @access Private
router.get('/nulloperator', (req, res, next) => {
  const name = undefined;
  const operator = {
    name: name
  }

  res.json({operator: operator});
});

module.exports = router;