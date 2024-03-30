// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  getResponse,
  HTTP_STATUS_CODES,
} from "node-api-helpers/build/api/index.js";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    console.log(event);
    const query = event.queryStringParameters;

    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    if (!query?.id) {
      const response = await sdkCalls.getMasterCategories("master_categories");
      const categories = response.Items?.map((item: any) => {
        return unmarshall(item);
      });
      console.log(categories);
      return getResponse(
        {
          message: "Success",
          data: categories,
        },
        HTTP_STATUS_CODES.OK
      );
    } else {
      const response = await sdkCalls.getMasterCategoryById(
        "master_categories",
        query?.id
      );
      const category = unmarshall(response.Item!);
      console.log(category);
      return getResponse(
        {
          message: "Success",
          data: category,
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
