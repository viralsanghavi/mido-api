import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { getResponse, HTTP_STATUS_CODES } from "node-api-helpers/api/api.js";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    const query = event.queryStringParameters;

    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.getProductById("products", query.id);
    const product = unmarshall(response.Item!);
    console.log(product);
    return getResponse(
      {
        message: "Successfully called the api",
        data: response.Item,
      },
      HTTP_STATUS_CODES.OK
    );
    // return response;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
