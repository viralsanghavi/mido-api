const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});

exports.handler = async (event, context, callback) => {
  const params = {
    TableName: "myTable",
    Key: {
      id: "123",
    },
  };

  docClient.get(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
