// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import {unmarshall} from "@aws-sdk/util-dynamodb";
import {
  getResponse,
  HTTP_STATUS_CODES,
} from "node-api-helpers/build/api/index.js";
import {SdkCalls} from "./lib/sdkcall";

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
      return getResponse(
        {
          message: "Success",
          data: products,
        },
        HTTP_STATUS_CODES.OK
      );
    } else {
      const productResponse = await sdkCalls.getProductById(
        "products",
        query?.id
      );
      const product = unmarshall(productResponse.Item!);
      const categoryResponse = await sdkCalls.getProductCategories(
        "categories",
        product.categories
      );
      const categories = categoryResponse.Items?.map((item: any) => {
        return unmarshall(item);
      });
      product.categories = categories;
      return getResponse(
        {
          message: "Success",
          data: product,
        },
        HTTP_STATUS_CODES.OK
      );
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
