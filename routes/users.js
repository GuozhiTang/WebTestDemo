// All of our users' routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// Bring in our models
const User = require('../models/user');

// Register - /users/register
// To register and add new users
router.post('/register', (req, res, next) => {
  //  res.send('REGISTER');
  let newUser = new User({
    name: req.body.name,
    department: req.body.department
  });
  // adduser inside the model
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User Registered!'});
    }
  });
});

// Search users by Name
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

// Authenticate- /users/authenticate
// To authenticate that whether the login user has same information with register one.
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

// Profile - /users/profile
// one of the routes we will protect with our aithenticate with our token
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