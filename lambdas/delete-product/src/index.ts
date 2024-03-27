// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { DeleteItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { Product } from "./lib/interface";
import {
  HTTP_STATUS_CODES,
  getResponse,
} from "node-api-helpers/build/api/index.js";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    const query = event.queryStringParameters;
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.deleteProduct(
      "products",
      query.id,
      query.name
    );
    // const product = unmarshall(response.);
    console.log("Product deleted successfully");
    return getResponse(
      {
        message: "Product deleted successfully",
      },
      HTTP_STATUS_CODES.OK
    );
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
