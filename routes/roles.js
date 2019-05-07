const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Role = require('../models/role');
const request = require('request');

router.get('/getroles', (req, res, next) => {
  Role.find((err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

router.post('/addroles', (req, res, next) => {
  let newRole = new Role({
    moduleName: req.body.moduleName,
    className: req.body.className,
    liquid_class: req.body.liquid_class,
    role: req.body.role,
    reagent: req.body.reagent,
    id: req.body.id
  });
  Role.addRole(newRole, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Roles!'});
    } else {
      res.json({success: true, msg:'Add Roles successfully!'});
    }
  });
});

router.post('/grabroles', (req, res, next) => {
  Role.grabRoles((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab Roles!'});
    } else {
      try {
        res.json({success: true, msg:'Grab Roles successfully!'});
        // console.log(res);
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

router.post('/searchbyrole', (req, res, next) => {
  const rolename = req.body.role;

  Role.getByRole(rolename, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

router.post('/searchbymodulename', (req, res, next) => {
  const moduleName = req.body.moduleName;

  Role.getByModuleName(moduleName, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

router.post('/searchbyid', (req, res, next) => {
  const id = req.body.id;

  Role.getById(id, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

router.post('/searchbyconditions', (req, res, next) => {
  const rolename = req.body.role;
  const moduleName = req.body.moduleName;

  Role.getByConditions(rolename, moduleName, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

module.exports = router;