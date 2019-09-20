exports.getAllAccounts = async docClient => {
  let result = [];

  const params = {
    TableName: "accounts"
  };

  let data = await docClient.scan(params).promise();
  result = result.concat(data.Items);

  // THIS LINE FOR DEMO ONLY. CAN BE INTIALIZATION SERVICE.
  if (!result || result.length === 0) {
    let accounts = await populateDB(docClient);
    result = result.concat(accounts);
  }

  while (typeof data.LastEvaluatedKey != "undefined") {
    params.ExclusiveStartKey = data.LastEvaluatedKey;
    data = await docClient.scan(params).promise();
    result = result.concat(data.Items);
  }

  result.forEach(r => (r.pin = undefined));

  return result;
};

exports.verifyPIN = async (docClient, accountNo, cardNo, pinToValidate) => {
  const params = {
    TableName: "accounts",
    Key: {
      accountNo: accountNo,
      cardNo: cardNo
    }
  };

  let customer = await docClient.get(params).promise();
  return customer && customer.Item && customer.Item.pin === pinToValidate;
};

const populateDB = async docClient => {
  let accounts = require("../dummy/accounts");
  for (const account of accounts) {
    var params = {
      TableName: "accounts",
      Item: account
    };

    await docClient.put(params).promise();
  }
  return accounts;
};
