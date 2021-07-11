const fs = require('fs');
const timecard_20210501 = JSON.parse(fs.readFileSync('src/stub/timecard/20210501.json', 'utf8'));
const timecard_20210502 = JSON.parse(fs.readFileSync('src/stub/timecard/20210502.json', 'utf8'));
const timecard_20210503 = JSON.parse(fs.readFileSync('src/stub/timecard/20210503.json', 'utf8'));

const get = (req, res) => {
  console.log('getTimeCard');
  const { user_id, date } = req.params;
  if (user_id !== 'test_user') {
    res.status(204);
    return;
  }
  switch (date) {
    case '20210501':
      res.status(200).json(timecard_20210501);
      break;
    case '20210502':
      res.status(200).json(timecard_20210502);
      break;
    case '20210503':
      res.status(200).json(timecard_20210503);
      break;
    default:
      res.status(404);
      break;  
  }
};

const timecard = {
  get,
};

module.exports = timecard;