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

export const handler = async function (): Promise<any> {
  try {
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.getHeaders("master_categories");
    // const master_categories: any = [];
    // const master_categories = response.Items?.map(
    //   async (element) => {
    //     let data = unmarshall(element);
    //     data.categories = (
    //       await sdkCalls.getCategories("categories", data.id)
    //     ).Items;
    //     console.log(master_categories);
    //     return data;
    //   }
    // );
    const master_categories: any = [];
    if (response.Items) {
      for (let i in response.Items) {
        let element = response.Items[i];
        let data = unmarshall(element);
        data.categories = (
          await sdkCalls.getCategories("categories", data.id)
        ).Items?.map((item: any) => {
          return unmarshall(item);
        });
        master_categories.push(data);
      }
    }
    // const master_categoriesa = response.Items?.map((item: any) => {
    //   return unmarshall(item);
    // });
    console.log(master_categories);
    master_categories.sort((a: any, b: any) => a.order - b.order);

    return getResponse(
      {
        message: "Success",
        data: master_categories,
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
