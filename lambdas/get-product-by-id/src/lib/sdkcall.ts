/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  DeleteItemCommand,
  DeleteItemCommandOutput,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { marshall } from "@aws-sdk/util-dynamodb";
import { table } from "console";

export class SdkCalls {
  private ddbClient: DynamoDBClient;

  constructor(region: string) {
    this.ddbClient = new DynamoDBClient({
      region: region,
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 3000,
        socketTimeout: 2000,
      }),
      endpoint: "http://localhost:8000",
    });
  }

  //   Update the below later
  //   /**
  //    * Applies the specified lifecycle rule to provided repository.
  //    * @param {string} repositoryName - An repository name.
  //    * @param {string} policyText - The JSON representation of the lifecycle policy.
  //    * @returns {Promise<void>} - Resolves when the lifecycle rules are applied.
  //    */
  async getProductById(
    tableName: string,
    id: string
  ): Promise<GetItemCommandOutput> {
    try {
      console.log(`Start get all repositories: ${tableName}`);
      const response = await this.ddbClient.send(
        new GetItemCommand({
          TableName: tableName,
          Key: marshall({
            id: id,
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
