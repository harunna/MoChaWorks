const fs = require('fs');
const timecardList_202105 = JSON.parse(fs.readFileSync('src/stub/timecardList/202105.json', 'utf8'));

const get = (req, res) => {
  console.log('timecardList');
  res.status(200).json(timecardList_202105);
};

const timecardList = {
  get,
};

module.exports = timecardList;