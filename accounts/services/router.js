const actions = require("./actions").ACTIONS;

exports.factory = (httpMethod, path) => {
  if (httpMethod === "GET" && path === "/accounts") {
    return actions.GET_ACCOUTNS;
  } else if (httpMethod === "POST" && path === "/accounts/verifyPIN") {
    return actions.VERIFY_PIN;
  } else {
    return actions.UNDEFINED;
  }
};
