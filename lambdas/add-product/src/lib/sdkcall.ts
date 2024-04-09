/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";
import { createFolderIfNotExist } from "./utils";

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

  //   Update the below later
  //   /**
  //    * Applies the specified lifecycle rule to provided repository.
  //    * @param {string} repositoryName - An repository name.
  //    * @param {string} policyText - The JSON representation of the lifecycle policy.
  //    * @returns {Promise<void>} - Resolves when the lifecycle rules are applied.
  //    */
  async addProduct(
    tableName: string,
    product: any
  ): Promise<PutItemCommandOutput> {
    try {
      console.log(`Start add product: ${tableName}`);
      const s3BaseUrl = "https://d2fsc8h6riwg8g.cloudfront.net/";
      let images: string[] = [];
      let bannerImage: string = "";

      for (const file in product.files) {
        if (product.files[file].fieldname == "images") {
          await createFolderIfNotExist(
            "mido-gifts-assets",
            `products/${product.name}/images/${product.files[file].filename}`,
            product.files[file].content
          );
          images.push(
            `${s3BaseUrl}products/${product.name}/images/${product.files[file].filename}`
          );
        } else {
          await createFolderIfNotExist(
            "mido-gifts-assets",
            `products/${product.name}/banner/${product.files[file].filename}`,
            product.files[file].buffer
          );
          bannerImage = `${s3BaseUrl}products/${product.name}/banner/${product.files[file].filename}`;
        }
      }

      const id: string = uuid();
      const query = {
        TableName: tableName,
        Item: marshall({
          id,
          name: product.name,
          description: product.description,
          details: product.details,
          images,
          banner_image: bannerImage,
          categories: JSON.parse(product.categories),
          price: product.price,
          created_at: Date.now(),
          updated_at: Date.now(),
        }),
      };
      console.log(query);

      const response = await this.ddbClient.send(new PutItemCommand(query));
      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Put Command: ${error}`
      );
    }
  }
}
