// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { unmarshall } from "@aws-sdk/util-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { getResponse, HTTP_STATUS_CODES } from "node-api-helpers/api/api.js";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    console.log(event);
    const query = event.queryStringParameters;

    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    if (!query?.id) {
      const response = await sdkCalls.getProducts("products");
      const products = response.Items?.map((item: any) => {
        return unmarshall(item);
      });
      console.log(products);
      // return getResponse(
      //   {
      //     message: "Successfully called the api",
      //     data: products,
      //   },
      //   HTTP_STATUS_CODES.OK
      // );
      return {
        body: JSON.stringify({
          message: "Success",
          data: products,
        }),
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          contentType: "application/json",
        },
      };
    } else {
      const response = await sdkCalls.getProductById("products", query?.id);
      const product = unmarshall(response.Item!);
      console.log(product);
      // return getResponse(
      //   {
      //     message: "Successfully called the api",
      //     data: response.Item,
      //   },
      //   HTTP_STATUS_CODES.OK
      // );
      return {
        body: JSON.stringify({
          message: "Success",
          data: product,
        }),
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          contentType: "application/json",
        },
      };
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
