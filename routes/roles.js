/*
 * @Description: Route configuration for Roles
 * @Author: Guozhi Tang
 * @Date: 2019-05-07 14:00:45
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:58:27
 */
const express = require('express');
const router = express.Router();
// Bring in our models
const Role = require('../models/role');

// @route  GET roles/getroles
// @desc   To get all roles locally
// @access Private
router.get('/getroles', (req, res, next) => {
  Role.find((err, role) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Roles!'});
    } else {
      res.json(role);
    }
  });
});

// @route  POST roles/addrole
// @desc   To add and save new roles locally
// @access Private
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

// @route  POST roles/resetroles
// @desc   1. Drop the current Role collection locally
// @desc   2. To pull Roles from remote server to local database
// @access Private
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

// @route  POST roles/searchbyrole
// @desc   Search by Role
// @access Private
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

// @route  POST roles/searchbyliquidclass
// @desc   Search by Liquid_class
// @access Private
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

// @route  POST roles/searchbyid
// @desc   Search by role_id
// @access Private
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

// @route  POST roles/searchbyconditions
// @desc   Search by both role and liquid_class
// @access Private
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