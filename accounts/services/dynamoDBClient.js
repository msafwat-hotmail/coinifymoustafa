const AWS = require("aws-sdk");

exports.factory = () => {
  AWS.config.update({ region: "us-east-1" });
  return new AWS.DynamoDB.DocumentClient();
};
