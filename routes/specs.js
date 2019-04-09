// All of our specs' routes
const express = require('express');
const router = express.Router();
const config = require('../config/database');
// Bring in our models
const Spec = require('../models/spec');
const request = require('request');

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

router.post('/addspecs', (req, res, next) => {
  let newSpec = new Spec({
    className: req.body.className,
    moduleName: req.body.moduleName,
    description: req.body.description,
    name: req.body.name,
    id: req.body.id
  });
  // addspec inside the model
  Spec.addSpec(newSpec, (err, spec) => {
    if (err) {
      res.json({success: false, msg:'Failed to add Specs!'});
    } else {
      res.json({success: true, msg:'Add Specs successfully!'});
    }
  });
});

router.post('/grabspecs', (req, res, next) => {
  Spec.grabspecs((err, dataObj) => {
    if (err) {
      res.json({success: false, msg:'Failed to grab specs!'});
      // console.log('Failed to grab specs!');
    } else {
      try {
        res.json({success: true, msg:'Grab Specs successfully!'});
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