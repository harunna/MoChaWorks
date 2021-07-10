var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  const sample = {
    id: '001',
    name: 'Taro',
  };
  res.status(200).json(sample);
});

module.exports = router;