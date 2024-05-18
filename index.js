import {getResponse, HTTP_STATUS_CODES} from "node-api-helpers/api/api.js";
import {DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
  const ddbClient = new DynamoDBClient({
    region: "ap-south-1",
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 3000,
      socketTimeout: 2000,
    }),
    // endpoint: "http://host.docker.internal:8000",
  });
  const response = await ddbClient.send(
    new ScanCommand({TableName: "categories"})
  );
  return getResponse(
    {
      message: "Successfully called the api",
      data: response.Items,
    },
    HTTP_STATUS_CODES.OK
  );
};
