/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { v4 as uuid } from "uuid";

export class SdkCalls {
  private ddbClient: DynamoDBClient;

  constructor(region: string) {
    this.ddbClient = new DynamoDBClient({
      region: region,
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 3000,
        socketTimeout: 2000,
      }),
      endpoint: "http://host.docker.internal:8000",
    });
  }

  //   Update the below later
  //   /**
  //    * Applies the specified lifecycle rule to provided repository.
  //    * @param {string} repositoryName - An repository name.
  //    * @param {string} policyText - The JSON representation of the lifecycle policy.
  //    * @returns {Promise<void>} - Resolves when the lifecycle rules are applied.
  //    */
  async addCategory(
    tableName: string,
    category: any
  ): Promise<PutItemCommandOutput> {
    try {
      console.log(`Start add category: ${tableName}`);
      const id: string = uuid();
      const response = await this.ddbClient.send(
        new PutItemCommand({
          TableName: tableName,
          Item: marshall({
            id: id,
            name: category.name,
            description: category.description,
            image: category.image,
            banner_image: category.banner_image,
            master_categories: category.master_categories,
          }),
        })
      );
      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Scan Command: ${error.message}`
      );
    }
  }
}
