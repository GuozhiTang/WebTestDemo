const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Role = require('../models/role');

// To get all roles locally
router.get('/getroles', (req, res, next) => {
  Role.find((err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

// To add and save new roles locally
router.post('/addrole', (req, res, next) => {
  // console.log(req.body);
  let newRole = new Role(req.body);
  Role.addRole(newRole, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Roles!'});
    } else {
      res.json({success: true, msg:'Add Roles successfully!'});
    }
  });
});

// 1. Drop the current Role collection locally
// 2. To pull Roles from remote server to local database
router.post('/resetroles', (req, res, next) => {
  Role.resetRoles((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset Roles!'});
    } else {
      try {
        res.json({success: true, msg:'Reset Roles successfully!'});
        // console.log(res);
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
});

// Search by Role
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

// Search by Liquid_class
router.post('/searchbyliquidclass', (req, res, next) => {
  const liquid_class = req.body.liquid_class;

  Role.getByLiquidClass(liquid_class, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

// Search by role_id
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

// Search by both role and liquid_class
router.post('/searchbyconditions', (req, res, next) => {
  const rolename = req.body.role;
  const liquid_class = req.body.liquid_class;

  Role.getByConditions(rolename, liquid_class, (err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

module.exports = router;