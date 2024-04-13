import {
  BatchWriteItemCommand,
  CreateTableCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";

process.env.ENVIRONMENT = "ap-south-1";
process.env.ENDPOINT = "http://localhost:8000";

const client = new DynamoDBClient({
  region: "ap-south-1",
  // endpoint: "http://localhost:8000",
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
  return await client.send(
    new BatchWriteItemCommand({
      RequestItems: {
        master_categories: [
          {
            PutRequest: {
              Item: marshall({
                id: "bf4553f4-ce21-47d7-9f14-46e81cac118f",
                name: "Shop",
                details: "qwertyuiop",
                is_header: true,
                order: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
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
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "b677b252-b7bb-4b38-b038-3959c8144cf8",
                name: "Significant Bonds",
                details: "thoughtful gifts for every special person",
                is_header: false,
                order: null,
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "7d5399a8-01bf-4823-819a-b4c1b44223e7",
                name: "What's The Occasion?",
                details: "elevate every moment with thoughtful gifting solutions",
                is_header: false,
                order: null,
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
        ],
      },
    })
  );
};
const insertCategories = async () => {
  return await client.send(
    new BatchWriteItemCommand({
      RequestItems: {
        categories: [
          {
            PutRequest: {
              Item: marshall({
                id: "77f01486-fb11-447d-babf-98a082e233ed",
                name: "Awards & Momentos ",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "77f01486-fb11-447d-babf-98a082e233ed",
                name: "Bar Accessories",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "5fbd9958-989a-422e-9bab-4ebb4cf2cb19",
                name: "Bath & Body",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "2881c0a7-3a33-41e4-b861-ccdb1bcaab90",
                name: "Games",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "b88eaf2a-ba2a-4b61-9058-4303fdf41658",
                name: "Crockery",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "775f32e8-30b1-4fb2-af65-dc953194aad3",
                name: "Essentials",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed695-84bc-7bb5-878c-f6e4611f2e68",
                name: "Gadgets",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed695-ed12-7da5-9d1d-7f9e0fac6fbf",
                name: "Spiritual Gifts",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed696-728e-7182-b089-bc54f78f5c30",
                name: "Merchandise",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed697-2a21-7079-806d-a3f2e7793440",
                name: "Metal Gifts",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed697-a752-7d26-af42-2f5946bad044",
                name: "Office Essentials",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed698-b384-7deb-beae-b76a6a8afb97",
                name: "Travel Essentials",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69c-5dd3-7504-8998-cab1c5cf5efc",
                name: "Food & Beverages",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69c-c980-76ea-80f1-72cd56e16957",
                name: "Electronics",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69d-ef40-7a8f-a397-bb91a7dafafe",
                name: "Handmade",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69e-ab83-7cf9-8de9-01e93bcb811e",
                name: "Copper Gift Articles",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69e-ab83-7cf9-8de9-01e93bcb811e",
                name: "Eco-friendly",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69f-9222-786f-a6aa-a10bde8eb396",
                name: "Boxes & Trays",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed69f-f0f2-78f0-90d9-0047a7111b52",
                name: "German Silver",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a0-60ad-7dfe-ad33-8dd1b4310fb9",
                name: "Kids",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b677b252-b7bb-4b38-b038-3959c8144cf8"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a0-e441-7adf-bfbf-85849a150be1",
                name: "Trophies",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a1-51f2-75b0-96fd-73eaa66035e6",
                name: "Aroma",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a2-19d3-77d2-8fed-1f08789f371b",
                name: "Home Decor",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a3-17d8-7359-8502-c2f32047b0a7",
                name: "Alcohol",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a3-88f7-7850-9e2b-276bf22754a1",
                name: "Handicrafts",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6a4-1a5c-705b-9b34-1635ebe0c5e9",
                name: "Frames",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["bf4553f4-ce21-47d7-9f14-46e81cac118f"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6ad-e90d-7187-ba05-6fb48a43e064",
                name: "Anniversarys",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6ae-c86b-72af-98bb-425966f0bd1d",
                name: "Birthdays",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e", "7d5399a8-01bf-4823-819a-b4c1b44223e7",],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6af-7336-7e28-9655-b6171e179faf",
                name: "Baby Shower",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e", "7d5399a8-01bf-4823-819a-b4c1b44223e7",],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6af-fca7-7ff4-b990-22df322815fe",
                name: "House Warming",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e", "7d5399a8-01bf-4823-819a-b4c1b44223e7"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6b0-6b88-708a-b20e-65b4900dd08e",
                name: "Diwali",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6b0-6b88-708a-b20e-65b4900dd08e",
                name: "Wedding",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b3c25754-b8a4-4d14-ba0a-7f454410d38e", "7d5399a8-01bf-4823-819a-b4c1b44223e7",],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6b4-01f4-7e52-9edf-f90f5e165cb2",
                name: "For Him",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b677b252-b7bb-4b38-b038-3959c8144cf8"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6b4-4858-7968-93d3-894611bfb971",
                name: "For Her",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b677b252-b7bb-4b38-b038-3959c8144cf8"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6b4-dacf-710e-8763-09101b009f9b",
                name: "Parents",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b677b252-b7bb-4b38-b038-3959c8144cf8"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
          {
            PutRequest: {
              Item: marshall({
                id: "018ed6b5-f393-7102-8ef4-fe096a999df3",
                name: "Colleague",
                details: "qwertyuiop",
                image: "",
                banner_image: "",
                master_categories: ["b677b252-b7bb-4b38-b038-3959c8144cf8"],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },
        ],
      },
    })
  );
};

const insertProducts = async () => {
  // master_categories.
  return await client.send(
    new BatchWriteItemCommand({
      RequestItems: {
        products: [
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
                categories: [
                  "77f01486-fb11-447d-babf-98a082e233ed",
                  "775f32e8-30b1-4fb2-af65-dc953194aad3",
                ],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
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
                updated_at: Date.now(),
              }),
            },
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
                categories: [
                  "2881c0a7-3a33-41e4-b861-ccdb1bcaab90",
                  "b3c25754-b8a4-4d14-ba0a-7f454410d38e",
                ],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
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
                updated_at: Date.now(),
              }),
            },
          },
        ],
      },
    })
  );

};
const insertUiConfig = async () => {
  return await client.send(
    new BatchWriteItemCommand({
      RequestItems: {
        ui_config: [
          {
            PutRequest: {
              Item: marshall({
                name: "Home",
                elements: [{
                  "id": "b677b252-b7bb-4b38-b038-3959c8144cf8",
                  "type": "master_categories",
                  "order": 1
                }, {
                  "id": "7d5399a8-01bf-4823-819a-b4c1b44223e7",
                  "type": "master_categories",
                  "order": 2
                }],
                created_at: Date.now(),
                updated_at: Date.now(),
              }),
            },
          },


        ],
      },
    })
  );

};

const createAllTables = async () => {
  await createTable(
    "master_categories",
    [{ AttributeName: "id", KeyType: "HASH" }],
    [{ AttributeName: "id", AttributeType: "S" }]
  );
  await createTable(
    "categories",
    [{ AttributeName: "id", KeyType: "HASH" }],
    [{ AttributeName: "id", AttributeType: "S" }]
  );
  await createTable(
    "products",
    [{ AttributeName: "id", KeyType: "HASH" }],
    [{ AttributeName: "id", AttributeType: "S" }]
  );

  await createTable(
    "contact_details",
    [{ AttributeName: "id", KeyType: "HASH" }],
    [{ AttributeName: "id", AttributeType: "S" }]
  );

  await createTable(
    "testimonials",
    [{ AttributeName: "id", KeyType: "HASH" }],
    [{ AttributeName: "id", AttributeType: "S" }]
  );

  await createTable(
    "newsletter",
    [{ AttributeName: "email", KeyType: "HASH" }],
    [{ AttributeName: "email", AttributeType: "S" }]
  );

  await createTable(
    "ui_config",
    [{ AttributeName: "name", KeyType: "HASH" }],
    [{ AttributeName: "name", AttributeType: "S" }]
  );

  await insertMasterCategories();

  await insertCategories();

  await insertProducts();

  await insertUiConfig();
};

createAllTables();
