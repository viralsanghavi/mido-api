import {
  getResponse,
  HTTP_STATUS_CODES,
} from "node-api-helpers/build/api/index.js";
import {SdkCalls} from "./lib/sdkcall";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    const body = JSON.parse(event.body);

    // Initialize SDK calls
    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.contactForm("contact_details", body);
    return getResponse(
      {
        message: "Contact added successfully",
      },
      HTTP_STATUS_CODES.OK
    );
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
    return getResponse(
      {
        message: `[Error] - Failed to execute lambda function: ${error.message}`,
      },
      HTTP_STATUS_CODES.BAD_REQUEST
    );
  }
};
