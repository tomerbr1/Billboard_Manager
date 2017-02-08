/**
 * Created by Shahar on 08/02/2017.
 */


var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//var db = mongojs('mongodb://localhost:27017/AdsDB', ['Ads']);
//var db = mongojs('mongodb://Admin:123456@localhost:27017/AdsDB', ['ads']);
var db = mongojs('mongodb://127.0.0.1/AdsDB', ['Ads']);


/* GET All Ads */
router.get('/ads', function(req, res, next) {
	console.log("Arrived to/ads");
    db.ads.find(function(err, ads) {
    if (err) {
      res.send(err);
    } else {
      res.json(ads);
    }
  });
});



/* GET One Ad with the provided ID */
router.get('/ad/:id', function(req, res, next) {
  db.ads.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, ads) {
    if (err) {
      res.send(err);
    } else {
      res.json(ads);
    }
  });
});

/* POST/SAVE an Ad */
router.post('/ad', function(req, res, next) {
  var ad = req.body;
  if (!ad.text || !ad.title) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.ads.save(ad, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});

/* PUT/UPDATE an Ad */
router.put('/ad/:id', function(req, res, next) {
  var ad = req.body;
  var updObj = {};

  if (ad.text) {
    updObj.text = ad.text;
  }

  if (!updObj) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.ads.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updObj, {}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }


});

/* DELETE an Ad */
router.delete('/ad/:id', function(req, res) {
  db.ad.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });

});

module.exports = router;
