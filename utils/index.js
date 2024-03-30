import { BatchWriteItemCommand, CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";

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

const insertMasterCategories = async () => {
  return await client.send(new BatchWriteItemCommand({
    RequestItems: {
      'master_categories': [
        {
          PutRequest: {
            Item: marshall({
              id: "bf4553f4-ce21-47d7-9f14-46e81cac118f",
              name: "Shop",
              details: "qwertyuiop",
              is_header: true,
              order: 1,
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "b3c25754-b8a4-4d14-ba0a-7f454410d38e",
              name: "Hampers by occasion",
              details: "qwertyuiop",
              is_header: true,
              order: 2,
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "b677b252-b7bb-4b38-b038-3959c8144cf8",
              name: "Trending",
              details: "qwertyuiop",
              is_header: false,
              order: null,
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "7d5399a8-01bf-4823-819a-b4c1b44223e7",
              name: "Treasured Connections",
              details: "qwertyuiop",
              is_header: false,
              order: null,
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
      ]
    }
  }))
}
const insertCategories = async () => {
  return await client.send(new BatchWriteItemCommand({
    RequestItems: {
      'categories': [
        {
          PutRequest: {
            Item: marshall({
              id: "77f01486-fb11-447d-babf-98a082e233ed",
              name: "Games",
              details: "qwertyuiop",
              image: "",
              banner_image: "",
              master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "5fbd9958-989a-422e-9bab-4ebb4cf2cb19",
              name: "Trophies",
              details: "qwertyuiop",
              image: "",
              banner_image: "",
              master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "2881c0a7-3a33-41e4-b861-ccdb1bcaab90",
              name: "Alcohol",
              master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
              details: "qwertyuiop",
              image: "",
              banner_image: "",
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "b88eaf2a-ba2a-4b61-9058-4303fdf41658",
              name: "Diwali",
              details: "qwertyuiop",
              image: "",
              banner_image: "",
              master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "775f32e8-30b1-4fb2-af65-dc953194aad3",
              name: "Birthdays",
              details: "qwertyuiop",
              image: "",
              banner_image: "",
              master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
      ]
    }
  }))
}
const insertProducts = async () => {
  // master_categories.
  return await client.send(new BatchWriteItemCommand({
    RequestItems: {
      'products': [
        {
          PutRequest: {
            Item: marshall({
              id: "77f01486-fb11-447d-babf-98a082e233ed",
              name: "FIFA 24",
              details: "qwertyuiop",
              description: "",
              price: "2499",
              images: [],
              banner_image: "",
              categories: ["77f01486-fb11-447d-babf-98a082e233ed", "775f32e8-30b1-4fb2-af65-dc953194aad3"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "8d6acbc2-a9e1-4e4c-a27e-9ffb415f023f",
              name: "Medal",
              details: "qwertyuiop",
              description: "",
              price: "",
              images: [],
              banner_image: "",
              categories: ["5fbd9958-989a-422e-9bab-4ebb4cf2cb19"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "70a47fbb-a605-47a3-861e-ad1bd2e0bfb0",
              name: "Hoegarden Rose",
              details: "qwertyuiop",
              description: "",
              price: "",
              images: [],
              banner_image: "",
              categories: ["2881c0a7-3a33-41e4-b861-ccdb1bcaab90", "b3c25754-b8a4-4d14-ba0a-7f454410d38e"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
        {
          PutRequest: {
            Item: marshall({
              id: "012fba16-7266-4309-8cce-1e5c04b1a852",
              name: "Lantern",
              details: "qwertyuiop",
              description: "",
              price: "",
              images: [],
              banner_image: "",
              categories: ["b88eaf2a-ba2a-4b61-9058-4303fdf41658"],
              created_at: Date.now(),
              updated_at: Date.now()
            })
          }
        },
      ]
    }
  }))
}

const createAllTables = async () => {
  await createTable(
    "master_categories",
    [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    [
      { AttributeName: "id", AttributeType: "S" },
    ]
  );
  await createTable(
    "categories",
    [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    [
      { AttributeName: "id", AttributeType: "S" },
    ]
  );
  await createTable(
    "products",
    [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    [
      { AttributeName: "id", AttributeType: "S" },
    ]
  );

  await createTable(
    "contact_details",
    [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    [
      { AttributeName: "id", AttributeType: "S" },
    ]
  );

  await createTable(
    "testimonials",
    [{ AttributeName: "id", KeyType: "HASH" }],
    [{ AttributeName: "id", AttributeType: "S" }],
  );

  await createTable(
    "newsletter",
    [{ AttributeName: "email", KeyType: "HASH" }],
    [{ AttributeName: "email", AttributeType: "S" }],
  );

  await insertMasterCategories();

  await insertCategories();

  await insertProducts();

};

createAllTables();
