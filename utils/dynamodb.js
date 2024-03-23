import {CreateTableCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});

const params = {
  TableName: "ViralTable",
  KeySchema: [
    {AttributeName: "id", KeyType: "HASH"}, //Partition key
  ],
  AttributeDefinitions: [{AttributeName: "id", AttributeType: "N"}],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};
const command = new CreateTableCommand(params);
dynamodb.send(command).then(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
