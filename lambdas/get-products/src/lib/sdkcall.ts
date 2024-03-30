/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb/dist-types/commands";
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
  async getProducts(tableName: string): Promise<ScanCommandOutput> {
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

  async getProductCategories(
    tableName: string,
    categoryIds: string[]
  ): Promise<ScanCommandOutput> {
    try {
      // const itemKeys = (
      //   Object.keys(categoryIds) as Array<keyof typeof categoryIds>
      // ).filter((k) => k !== id);

      // let updateExpression = "SET ";
      // let expressionAttributeValues: { [key: string]: any } = {};

      // for (const key in category) {
      //   updateExpression += `${key} = :${key}, `;
      //   expressionAttributeValues[`:${key}`] = category[key];
      // }

      // // Remove trailing comma and space
      // updateExpression = updateExpression.slice(0, -2);

      // console.log(updateExpression);
      // console.log(expressionAttributeValues);

      const expression: string[] = [];
      const attributeValues: any = {};
      const attributeNames: any = {};
      let filterExpression = categoryIds.forEach((item: string, index) => {
        expression.push(`#${index} = :${index}`);
        attributeValues[`:${index}`] = { S: item };
        attributeNames[`#${index}`] = "id";
      });

      const params = {
        TableName: tableName,
        FilterExpression: expression.join(" or "),
        ExpressionAttributeValues: attributeValues,
        ExpressionAttributeNames: attributeNames,
      };
      console.log(params);

      console.log(`Start get all repositories: ${tableName}`);
      const response = await this.ddbClient.send(new ScanCommand(params));
      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Scan Command: ${error.message}`
      );
    }
  }
}
