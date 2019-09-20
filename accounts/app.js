"use strict";

const res = require("./services/responses");
const actions = require("./services/actions").ACTIONS;
const router = require("./services/router");
const accountsManager = require("./services/accountsManager");
const dynamoDBClient = require("./services/dynamoDBClient");

exports.handler = async (event, context) => {
  try {
    // Load DynamoDB Client.
    const docClient = dynamoDBClient.factory();

    // Route to target service.
    const action = router.factory(event.httpMethod, event.path);

    // Get all accounts and cards. (This step for mock only).
    if (action === actions.GET_ACCOUTNS) {
      const result = await accountsManager.getAllAccounts(docClient);
      return res.success(result);
    }

    // Verify Card PIN.
    else if (action === actions.VERIFY_PIN) {
      const body = JSON.parse(event.body);
      const result = await accountsManager.verifyPIN(
        docClient,
        body.accountNo,
        body.cardNo,
        body.pin
      );

      return result ? res.success(result) : res.badRequest();
    }

    // If request is not recognized return Not Found.
    else {
      return res.notFound();
    }
  } catch (e) {
    console.log(e);
    return res.serverError(e);
  }
};
