// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { unmarshall } from "@aws-sdk/util-dynamodb";
// import { getResponse, HTTP_STATUS_CODES } from "node-api-helpers/api/api.js";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (): Promise<ScanCommandOutput> {
  try {
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.getCategories("categories");
    const categories = response.Items?.map((item) => {
      return unmarshall(item);
    });
    console.log(categories);

    // return getResponse(
    //   {
    //     message: "Successfully called the api",
    //     data: response.Items,
    //   },
    //   HTTP_STATUS_CODES.OK
    // );
    return response;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
