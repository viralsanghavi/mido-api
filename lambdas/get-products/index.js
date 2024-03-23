import {
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
// Set the AWS Region
const REGION = "ap-south-1"; // replace with your region

// Create an Amazon DynamoDB service client object
const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: "http://localhost:8000",
});

// Set the parameters
const params = {
  TableName: "myTable",
};

const run = async () => {
  try {
    const data = await ddbClient.send(new ScanCommand(params));
    console.log("Success", data);
  } catch (err) {
    console.error(err);
  }
};

run();
