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

router.get('/list/:userId', (req, res) => {
  console.log('get URL : /list/:userId');
  try {
    timecardList.get(req, res);
  } catch (err) {
    console.log('err:', err);
  }
});

router.get('/list/:userId/:month', (req, res) => {
  console.log('get URL : /list/:userId/:month');
  try {
    timecardList.get(req, res);
  } catch (err) {
    console.log('err:', err);
  }
});

module.exports = router;