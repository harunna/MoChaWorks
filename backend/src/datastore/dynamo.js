const aws = require('aws-sdk');
aws.config.loadFromPath('./config/credentials.json');
const docClient = new aws.DynamoDB.DocumentClient();

const get = async (param) => {
  try {
    return await docClient.get(param).promise();
  } catch (e) {
    throw e;
  }
};

const query = async (param) => {
  try {
    return await docClient.query(param).promise();
  } catch (e) {
    throw e;
  }
};

const dynamoDB = {
  get,
  query,
};

module.exports = dynamoDB;