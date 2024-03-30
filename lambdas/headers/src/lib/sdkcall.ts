/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";

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
  async getHeaders(tableName: string): Promise<ScanCommandOutput> {
    try {
      console.log(`Start get all repositories: ${tableName}`);
      const response = await this.ddbClient.send(
        new ScanCommand({
          TableName: tableName,
        })
      );
      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Scan Command: ${error.message}`
      );
    }
  }

  async getCategories(
    tableName: string,
    masterCategoryId: string
  ): Promise<ScanCommandOutput> {
    try {
      const params = {
        TableName: tableName,
        FilterExpression: "contains(#master_categories,:master_categories)",
        ProjectionExpression: "#id,#name",
        ExpressionAttributeValues: {
          ":master_categories": {
            S: masterCategoryId,
          },
        },
        ExpressionAttributeNames: {
          "#master_categories": "master_categories",
          "#id": "id",
          "#name": "name",
        },
      };
      console.log(params);

      const response = await this.ddbClient.send(new ScanCommand(params));
      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Scan Command: ${error.message}`
      );
    }
  }
}
