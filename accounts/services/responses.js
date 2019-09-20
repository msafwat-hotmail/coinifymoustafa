response = (statusCode, body = "") => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Credentials": true
  };

  return {
    statusCode: statusCode,
    headers: headers,
    body: JSON.stringify(body)
  };
};

exports.success = result => {
  return response(200, result);
};

exports.notFound = () => {
  return response(404);
};

exports.badRequest = () => {
  return response(400);
};

exports.serverError = () => {
  return response(500);
};
