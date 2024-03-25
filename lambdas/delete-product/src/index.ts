// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { DeleteItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { Product } from "./lib/interface";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (
  event: any
): Promise<DeleteItemCommandOutput> {
  try {
    const query = JSON.parse(event.queryParams || "{}");
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = sdkCalls.deleteProduct("product", query.id);
    console.log(response);
    return response;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
