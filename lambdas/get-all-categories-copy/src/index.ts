// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import {SdkCalls} from "./lib/sdkcall";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (): Promise<ScanCommandOutput> {
  try {
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = sdkCalls.getAllCategories("categories");
    console.log((await response).Items);
    return response;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};

handler()