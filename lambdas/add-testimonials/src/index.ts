// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import {getResponse, HTTP_STATUS_CODES} from "node-api-helpers";
import {SdkCalls} from "./lib/sdkcall";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    const body: Testimonial = JSON.parse(event.body);
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    await sdkCalls.addTestimonials("testimonials", body);
    return getResponse(
      {
        message: "Successully added testimonial",
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
