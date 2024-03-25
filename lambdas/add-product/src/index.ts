import { BodyInit } from "./../../get-product-by-id/node_modules/undici-types/fetch.d";
// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { Product } from "./lib/interface";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (
  event: any
): Promise<PutItemCommandOutput> {
  try {
    console.log(event);
    const body = JSON.parse(event.body);
    console.log(body);

    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.addProduct("products", body);
    // const product = unmarshall(response.);
    console.log("Product added successfully");
    // return getResponse(
    //   {
    //     message: "Successfully called the api",
    //     data: response.Item,
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
