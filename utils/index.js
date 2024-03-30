import {DynamoDBClient, CreateTableCommand} from "@aws-sdk/client-dynamodb";

process.env.ENVIRONMENT = "ap-south-1";
process.env.ENDPOINT = "http://localhost:8000";

const client = new DynamoDBClient({
  region: "ap-south-1",
  endpoint: "http://localhost:8000",
});
console.log(process.env.ENDPOINT);

export const createTable = async (
  tableName,
  keySchema,
  attributeDefinitions
) => {
  const params = {
    TableName: tableName,
    KeySchema: keySchema,
    AttributeDefinitions: attributeDefinitions,
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    const command = new CreateTableCommand(params);
    const data = await client.send(command);
    console.log("Table Created:", data);
  } catch (err) {
    console.log("first");
    console.error(err);
  }
};

const createAllTables = async () => {
  await createTable(
    "master_categories",
    [
      {AttributeName: "id", KeyType: "HASH"},
    ],
    [
      {AttributeName: "id", AttributeType: "S"},
    ]
  );
  await createTable(
    "categories",
    [
      {AttributeName: "id", KeyType: "HASH"},
    ],
    [
      {AttributeName: "id", AttributeType: "S"},
    ]
  );
  await createTable(
    "products",
    [
      {AttributeName: "id", KeyType: "HASH"},
    ],
    [
      {AttributeName: "id", AttributeType: "S"},
    ]
  );

  await createTable(
    "contact_details",
    [
      {AttributeName: "id", KeyType: "HASH"},
    ],
    [
      {AttributeName: "id", AttributeType: "S"},
    ]
  );

  await createTable(
    "testimonials",
    [{AttributeName: "id", KeyType: "HASH"}],
    [{AttributeName: "id", AttributeType: "S"}],
  );

  await createTable(
    "newsletter",
    [{AttributeName: "email", KeyType: "HASH"}],
    [{AttributeName: "email", AttributeType: "S"}],
  );
};

createAllTables();
