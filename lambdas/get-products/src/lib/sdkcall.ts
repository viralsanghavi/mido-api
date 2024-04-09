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
import { generateCombinations } from "./utils";

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

  async getProductsByCategory(
    tableName: string,
    id: string
  ): Promise<ScanCommandOutput> {
    try {
      console.log(`Start get all repositories: ${tableName}`);
      const response = await this.ddbClient.send(
        new ScanCommand({
          TableName: tableName,
          FilterExpression: "contains(#categories,:categories)",
          ExpressionAttributeValues: {
            ":categories": {
              S: id,
            },
          },
          ExpressionAttributeNames: {
            "#categories": "categories",
          },
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

  async getProductbySearch(
    tableName: string,
    search: string
  ): Promise<ScanCommandOutput> {
    try {
      const expression: string[] = [];
      const attributeValues: any = {};
      const attributeNames: any = {};
      let filterExpression = generateCombinations(search).forEach(
        (item: string, index) => {
          expression.push(`contains(#${item},:${item})`);
          attributeValues[`:${item}`] = {
            S: item,
          };
          attributeNames[`#${item}`] = "name";
        }
      );
      // let filterExpression = search
      //   .split("")
      //   .forEach((alphabet: string, index) => {
      //     expression.push(
      //       `contains(#${alphabet.toLowerCase()},:${alphabet.toLowerCase()})`
      //     );
      //     attributeValues[`:${alphabet.toLowerCase()}`] = {
      //       S: alphabet.toLowerCase(),
      //     };
      //     attributeNames[`#${alphabet.toLowerCase()}`] = "name";
      //     expression.push(
      //       `contains(#${alphabet.toUpperCase()},:${alphabet.toUpperCase()})`
      //     );
      //     attributeValues[`:${alphabet.toUpperCase()}`] = {
      //       S: alphabet.toUpperCase(),
      //     };
      //     attributeNames[`#${alphabet.toUpperCase()}`] = "name";
      //   });

      const params = {
        TableName: tableName,
        // FilterExpression:
        //   "contains(#1, :1) or contains(#2, :2) or begins_with(#3, :3) or begins_with(#4, :4)",
        // ExpressionAttributeValues: {
        //   ":1": {
        //     S: search.toLowerCase(),
        //   },
        //   ":2": {
        //     S: search.toUpperCase(),
        //   },
        //   ":3": {
        //     S: search.toLowerCase(),
        //   },
        //   ":4": {
        //     S: search.toUpperCase(),
        //   },
        // },
        // ExpressionAttributeNames: {
        //   "#1": "name",
        //   "#2": "name",
        //   "#3": "name",
        //   "#4": "name",
        // },
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
