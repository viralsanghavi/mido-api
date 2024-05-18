import parser from "lambda-multipart-parser";
import {
  HTTP_STATUS_CODES,
  getResponse,
} from "node-api-helpers/build/api/index.js";
import {SdkCalls} from "./lib/sdkcall";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (event: any): Promise<any> {
  try {
    // const data: any = new FormData(event.body);
    // const value = Object.fromEntries(data?.entries());
    const result = await parser.parse(event);
    // Initialize SDK calls

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.uploadImage(result);
    return getResponse(
      {
        message: "Images uploaded",
        data: {
          images: response.images,
          banner_image: response.bannerImage,
        },
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
