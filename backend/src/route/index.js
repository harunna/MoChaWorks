var express = require('express');
var router = express.Router();
var timecard = require('../service/timecard');
var timecardList = require('../service/timecardList');

router.get('/:user_id/:date', (req, res) => {
  console.log('get URL : /:user_id/:date');
  try {
    timecard.get(req, res);
  } catch (err) {
    console.log('err:', err);
  }
});

router.get('/list/:user_id', (req, res) => {
  console.log('get URL : /list/:user_id');
  try {
    timecardList.get(req, res);
  } catch (err) {
    console.log('err:', err);
  }
});

router.get('/list/:user_id/:month', (req, res) => {
  console.log('get URL : /list/:user_id/:month');
  try {
    timecardList.get(req, res);
  } catch (err) {
    console.log('err:', err);
  }
});

module.exports = router;