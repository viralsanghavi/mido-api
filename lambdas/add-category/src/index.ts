// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { getResponse, HTTP_STATUS_CODES } from "node-api-helpers";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    console.log(event);
    const body = JSON.parse(event.body);
    console.log(body);
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.addCategory("categories", body);
    return getResponse(
      {
        message: "Successully added category",
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
