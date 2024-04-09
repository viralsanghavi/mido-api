/* eslint-disable @typescript-eslint/no-explicit-any */
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {NodeHttpHandler} from "@smithy/node-http-handler";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {ScanCommand, ScanCommandOutput} from "@aws-sdk/client-dynamodb";

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
  async getTestimonials(tableName: string): Promise<ScanCommandOutput> {
    try {
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
}
