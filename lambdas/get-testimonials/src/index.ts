// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import {getResponse, HTTP_STATUS_CODES} from "node-api-helpers";
import {SdkCalls} from "./lib/sdkcall";
import {unmarshall} from "@aws-sdk/util-dynamodb";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any, context: any): Promise<any> {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("=>>>>>>>>", event);
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS ,POST ,GET ,PUT ,DELETE",
      },
    };
  }

  try {
    // Initialize SDK calls
    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.getTestimonials("testimonials");
    const testimonials = response.Items?.map((item: any) => {
      return unmarshall(item);
    });
    return getResponse(
      {
        message: "Successully added testimonial",
        data: testimonials,
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
