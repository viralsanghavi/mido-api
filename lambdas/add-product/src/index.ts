import { PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { Product } from "./lib/interface";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  HTTP_STATUS_CODES,
  getResponse,
} from "node-api-helpers/build/api/index.js";
import parser from "lambda-multipart-parser";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    console.log(event);
    // const data: any = new FormData(event.body);
    // const value = Object.fromEntries(data?.entries());
    const result = await parser.parse(event);
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.addProduct("products", result);
    console.log("Product added successfully");
    return getResponse(
      {
        message: "Product added successfully",
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
