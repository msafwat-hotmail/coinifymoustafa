"use strict";

let app = null;
let records = null;

beforeAll(async done => {
  jest.doMock("../../services/dynamoDBClient", () => ({
    factory: () => ({
      scan: params => ({
        promise: () =>
          new Promise(function(resolve, reject) {
            resolve({
              Items: records
            });
          })
      }),
      get: params => ({
        promise: () =>
          new Promise(function(resolve, reject) {
            resolve({
              Item: records.filter(
                r =>
                  r.accountNo === params.Key.accountNo &&
                  r.cardNo === params.Key.cardNo
              )[0]
            });
          })
      }),
      put: params => ({
        promise: () =>
          new Promise(function(resolve, reject) {
            resolve();
          })
      })
    })
  }));

  app = require("../../app.js");

  done();
});

describe("Tests get accounts.", () => {
  test("Should get all accounts successfully, if there are records.", async () => {
    // Arrange
    const event = { path: "/accounts", httpMethod: "GET" };
    const context = {};

    records = [
      { accountNo: "ACC1", cardNo: "1", pin: "1234" },
      { accountNo: "ACC2", cardNo: "2", pin: "1235" }
    ];

    // Act
    const result = await app.handler(event, context);

    // Assert
    expect(result).not.toBeNull();
    expect(result).toBeDefined();

    expect(result.statusCode).toBe(200);

    expect(result.body).not.toBeNull();
    expect(result.body).toBeDefined();

    const body = JSON.parse(result.body);
    expect(body).toContainEqual(records[0]);
    expect(body).toContainEqual(records[1]);
    expect(body[0].pin).not.toBeDefined();
    expect(body[1].pin).not.toBeDefined();
  });

  // test("Should get empty accounts successfully, if there are no records.", async () => {
  //   // Arrange
  //   const event = { path: "/accounts", httpMethod: "GET" };
  //   const context = {};

  //   records = [];

  //   // Act
  //   const result = await app.handler(event, context);

  //   // Assert
  //   expect(result).not.toBeNull();
  //   expect(result).toBeDefined();

  //   expect(result.statusCode).toBe(200);

  //   expect(result.body).not.toBeNull();
  //   expect(result.body).toBeDefined();

  //   const body = JSON.parse(result.body);
  //   expect(body.length).toBe(0);
  // });
});

describe("Tests verify PIN.", () => {
  test("Should verify valid PIN successfully, if PIN is correct.", async () => {
    // Arrange
    const event = {
      path: "/accounts/verifyPIN",
      httpMethod: "POST",
      body: '{ "accountNo": "ACC1", "cardNo": "1", "pin": "1234" }'
    };
    const context = {};

    records = [
      { accountNo: "ACC1", cardNo: "1", pin: "1234" },
      { accountNo: "ACC2", cardNo: "2", pin: "1235" }
    ];

    // Act
    const result = await app.handler(event, context);

    // Assert
    expect(result).not.toBeNull();
    expect(result).toBeDefined();

    expect(result.statusCode).toBe(200);
  });

  test("Should verify invalid PIN, and return bad request.", async () => {
    // Arrange
    const event = {
      path: "/accounts/verifyPIN",
      httpMethod: "POST",
      body: '{ "accountNo": "ACC1", "cardNo": "1", "pin": "567" }'
    };
    const context = {};

    records = [
      { accountNo: "ACC1", cardNo: "1", pin: "1234" },
      { accountNo: "ACC2", cardNo: "2", pin: "1235" }
    ];

    // Act
    const result = await app.handler(event, context);

    // Assert
    expect(result).not.toBeNull();
    expect(result).toBeDefined();

    expect(result.statusCode).toBe(400);
  });
});
