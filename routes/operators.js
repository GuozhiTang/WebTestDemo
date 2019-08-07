const express = require('express');
const router = express.Router();
// Bring in our models
const Operator = require('../models/operator');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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

// To authenticate that whether the login operator has same information with exusted one.
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
          id: operator._id,
          name: operator.name
        },
        msg:'Login Successfully!'
      });
    }
  });
});

// Profile - /users/profile
// one of the routes we will protect with our aithenticate with our token
// router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//   // res.send('PROFILE');
//   // res.json({msg: "success profile"});
//   res.json({user: req.user});
// });

// router.get('/nulluser', (req, res, next) => {
//   const name = undefined;
//   const department = undefined;
//   const user = {
//     name: name,
//     department: department
//   }

//   res.json({user: user});
// });

module.exports = router;