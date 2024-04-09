/**
 * Description
 * @param {any} region:string
 * @returns {any}
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";
import { createFolderIfNotExist as upload } from "./utils";

export class SdkCalls {
  private ddbClient: DynamoDBClient;

  constructor(region: string) {
    this.ddbClient = new DynamoDBClient({
      region: region,
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 3000,
        socketTimeout: 2000,
      }),
      // endpoint: "http://host.docker.internal:8000",
    });
  }

  /**
   * Upload Image Sdk call
   * @param {any} product:any list of images
   * @returns {any}
   */
  async uploadImage(product: any): Promise<any> {
    try {
      const s3BaseUrl = "https://d2fsc8h6riwg8g.cloudfront.net/";
      let images: string[] = [];
      let bannerImage: string = "";

      for (const file in product.files) {
        if (product.files[file].fieldname == "images") {
          const imageUrl = await upload(
            "mido-gifts-assets",
            `products/images/${product.files[file].filename}`,
            product.files[file].content
          );
          images.push(imageUrl);
        } else {
          const imageUrl = await upload(
            "mido-gifts-assets",
            `products/banner/${product.files[file].filename}`,
            product.files[file].content
          );
          bannerImage = imageUrl;
        }
      }
      return { images, bannerImage };
    } catch (error: any) {
      throw new Error(
        `[Error - Upload Images] An error occurred calling the Put Object Command: ${error}`
      );
    }
  }
}
