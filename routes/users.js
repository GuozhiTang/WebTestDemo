/*
 * @Description: Route configuration for Users
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:45
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:57:35
 */
// All of our users' routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// Bring in our models
const User = require('../models/user');

// @route  POST users/register
// @desc   To register and add new users
// @access Private
router.post('/register', (req, res, next) => {
  //  res.send('REGISTER');
  let newUser = new User(req.body);
  // adduser inside the model
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User Registered!'});
    }
  });
});

// @route  POST users/getuserbyname
// @desc   Search users by Name
// @access Private
router.post('/getuserbyname', (req, res, next) => {
  const name = req.body.name;
  User.getUserByName(name, (err, user) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Specs!'});
    } else {
      res.json(user);
    }
  });
})

// @route  POST users/authenticate
// @desc   To authenticate that whether the login user has same information with register one.
// @access Private
router.post('/authenticate', (req, res, next) => {
  // res.send('AUTHENTICATE');
  const name = req.body.name;
  const department = req.body.department;

  // if (name == undefined || department == undefined) {
  //   res.json({success: false, msg:'Please complete each blank!'});
  
  User.getUserByName(name, (err, user) => {
    if (err) {
      res.json({success: false, msg:'Error exists for authentication!'});
    } else if (!user) {
      res.json({success: false, msg:'User not found!'});
    } else if (user.department != department) {
      res.json({success: false, msg:'Name and department are not matched!'});
    } else if (user.department == department) {
      const token = jwt.sign({data: user}, config.secret, {
        expiresIn: 604800 // One week
      });

      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          department: user.department
        },
        msg:'Login Successfully!'
      });
    }
  });
});

// @route  GET users/profile
// @desc   one of the routes we will protect with our aithenticate with our token
// @access Private
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // res.send('PROFILE');
  // res.json({msg: "success profile"});
  res.json({user: req.user});
});

router.get('/nulluser', (req, res, next) => {
  const name = undefined;
  const department = undefined;
  const user = {
    name: name,
    department: department
  }

  res.json({user: user});
});

module.exports = router;