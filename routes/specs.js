const express = require('express');
const router = express.Router();
// Bring in our models
const Spec = require('../models/spec');

// @route  GET specs/getspecs
// @desc   To get all Specs
// @access Private
router.get('/getspecs', (req, res, next) => {
  // res.send('GETSPECS');
  Spec.find((err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Specs!'});
    } else {
      res.json(spec);
    }
  });
});

// @route  POST specs/addspecs
// @desc   To add and save new Specs locally
// @access Private
router.post('/addspecs', (req, res, next) => {
  let newSpec = new Spec(req.body);
  // addspec inside the model
  Spec.addSpec(newSpec, (err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Specs!'});
    } else {
      res.json({success: true, msg:'Add Specs successfully!'});
    }
  });
});

// @route  POST specs/resetspecs
// @desc   1. Drop the current Spec collection locally
// @desc   2. To pull Specs from remote server to local database
// @access Private
router.post('/resetspecs', (req, res, next) => {
  Spec.resetSpecs((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to reset specs!'});
      // console.log('Failed to grab specs!');
    } else {
      try {
        res.json({success: true, msg:'Reset Specs successfully!'});
        // console.log(res);
        // console.log('Grab specs successfully!');
        // res.end();
      } catch (err) {
        res.end();
      }
    }
  });
  // request('http://10.253.7.14:8000/?request=getSpecs', function(error, response, body) {
  //   // console.log('error: ', error);
  //   // console.log('statusCode: ', response && response.statusCode);
  //   // console.log('body: ', body);
  //   if (response && response.statusCode == 200) {
  //     // var data=[];
  //     var data = body;
  //     // console.log(typeof(data));
  //     // console.log('data: ' + data);
  //     // for (var i = 0; i < 10; i++) {
  //     //   console.log('data ' + i + ': ' + data[i]);
  //     //   // var grab = new Spec(data[i]);
  //     //   // grab.save(function (err, doc) {
  //     //   //   if (err) {
  //     //   //     res.send(err);
  //     //   //   }
  //     //   //   res.json(doc);
  //     //   // });
  //     //   // grab.save();
  //     // }
  //     var dataObj = JSON.parse(data);
  //     // console.log('Type of dataObj: ' + typeof(dataObj));
  //     // var grab = new Spec(dataObj[0]);
  //     // console.log('The first parameter: ' + grab);
  //     for (var i = 0; i < dataObj.length; i++) {
  //       var grab = new Spec(dataObj[i]);
  //       // console.log('dataObj ' + i + ': ' + grab);
  //       grab.save();
  //     }
  //   }
  // });
});

// @route  POST specs/searchbyname
// @desc   Search by name
// @access Private
router.post('/searchbyname', (req, res, next) => {
  const name = req.body.name;

  Spec.getByName(name, (err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Specs!'});
    } else {
      res.json(spec);
    }
  });
});

// @route  POST specs/searchbymodulename
// @desc   Search by moduleName
// @access Private
router.post('/searchbymodulename', (req, res, next) => {
  const moduleName = req.body.moduleName;

  Spec.getByModuleName(moduleName, (err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Specs!'});
    } else {
      res.json(spec);
    }
  });
});

// @route  POST specs/searchbyid
// @desc   Search by id
// @access Private
router.post('/searchbyid', (req, res, next) => {
  const id = req.body.id;

  Spec.getById(id, (err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Specs!'});
    } else {
      res.json(spec);
    }
  });
});

// @route  POST specs/searchbyconditions
// @desc   Search by conditions
// @access Private
router.post('/searchbyconditions', (req, res, next) => {
  const name = req.body.name;
  const moduleName = req.body.moduleName;

  Spec.getByConditions(name, moduleName, (err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to get Specs!'});
    } else {
      res.json(spec);
    }
  });
});

module.exports = router;