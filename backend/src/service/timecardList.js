const dynamoDB = require('../datastore/dynamo');

const stubMode = require('../../config/config.json')['stub_mode'];
const fs = require('fs');
const timecardList_202105 = JSON.parse(fs.readFileSync('src/stub/timecardList/202105.json', 'utf8'));
const timecardList_202106 = JSON.parse(fs.readFileSync('src/stub/timecardList/202106.json', 'utf8'));

const get = async (req, res) => {
  console.log('timecardList');
  const { userId, month } = req.params;

  if (stubMode) {
    execStub(userId, month, res);
    return;
  }

  const param = {
    TableName: 'TimeCard',
    KeyConditionExpression: 'user_id = :user_id and work_date >= :work_date',
    ExpressionAttributeValues: {
      ':user_id': userId,
      ':work_date': month,
    }
  };

  try {
    const result = await dynamoDB.query(param);    
    res.status(200).json(createList(userId, month, result.Items));
  } catch (e) {
    res.status(200).json(e);
  }
};

/**
 * 指定した月の作業実績データを生成する
 * @param {*} userId ユーザーID
 * @param {*} yearMonth 指定月（yyyy-mm形式）
 * @param {*} records 作業月データ
 * @returns 指定月の作業実績データ
 */
const createList = (userId, yearMonth, records) => {
  const date = yearMonth.split('-');
  // 当月の最終日を取得
  const newDate = new Date(date[0], date[1], 0).getDate();

  // 当月の作業実績を生成する
  const list = [...Array(newDate)].map((_, i) => {
    // yyyy-mm-dd形式に変換
    const workDate = yearMonth + '-' + (i+1).toString().padStart(2, '0');
    const record = records.find(e => e.work_date === workDate);
    if (record) {
      return record;
    }
    // 作業日データがない場合は空データを返却
    return {
      "user_id": userId,
      "work_date": workDate,
      "work_record": {
        "start": "",
        "end": "",
        "place": ""
      },
      "total": "",
      "overtime": ""
    };
  });
  return list;
}

const execStub = (userId, month, res) => {
  let list = [];
  switch (month) {
    case '2021-05':
      list = createList(userId, month, timecardList_202105)
      res.status(200).json(list);
      break;
    case '2021-06':
      list = createList(userId, month, timecardList_202106)
      res.status(200).json(list);
      break;
    default:
      list = createList(userId, month, [])
      res.status(200).json(list);
      break;
  }
};


const timecardList = {
  get,
};

module.exports = timecardList;