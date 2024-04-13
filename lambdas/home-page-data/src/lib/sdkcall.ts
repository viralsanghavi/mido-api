/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
  GetItemCommand,
  GetItemCommandOutput,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
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
  async getHomePageData(
    tableName: string,
    uiName: string
  ): Promise<GetItemCommandOutput> {
    try {
      console.log(`Start get all repositories: ${tableName}`);
      const response = await this.ddbClient.send(
        new GetItemCommand({
          TableName: tableName,
          Key: marshall({
            name: uiName,
          }),
        })
      );
      console.log(unmarshall(response.Item!));

      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Scan Command: ${error.message}`
      );
    }
  }

  async getItem(
    tableName: string,
    categoryId: string
  ): Promise<GetItemCommandOutput> {
    try {
      const params = {
        TableName: tableName,
        Key: marshall({
          id: categoryId,
        }),
        ProjectionExpression: "#id,#name,#details",
        ExpressionAttributeNames: {
          "#id": "id",
          "#name": "name",
          "#details": "details",
        },
      };
      console.log(params);

      const response = await this.ddbClient.send(new GetItemCommand(params));

      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the category Command: ${error.message}`
      );
    }
  }

  // async getMasterCategory(
  //   tableName: string,
  //   masterCategoryId: string
  // ): Promise<ScanCommandOutput> {
  //   try {
  //     // const expression: string[] = [];
  //     // const attributeValues: any = {};
  //     // const attributeNames: any = {};
  //     // let filterExpression = categoryIds.forEach((item: string, index) => {
  //     //   expression.push(`contains(#${index}, :${index})`);
  //     //   attributeValues[`:${index}`] = { S: item };
  //     //   attributeNames[`#${index}`] = "id";
  //     // });

  //     const params = {
  //       TableName: tableName,
  //       FilterExpression: "#a = :a",
  //       ExpressionAttributeValues: {
  //         ":a": {
  //           S: masterCategoryId,
  //         },
  //       },
  //       ExpressionAttributeNames: {
  //         "#a": "id",
  //       },
  //     };
  //     // const params = {
  //     //   TableName: tableName,
  //     //   FilterExpression: "contains(#master_categories,:master_categories)",
  //     //   ProjectionExpression: "#id,#name",
  //     //   ExpressionAttributeValues: {
  //     //     ":master_categories": {
  //     //       S: masterCategoryId,
  //     //     },
  //     //   },
  //     //   ExpressionAttributeNames: {
  //     //     "#master_categories": "master_categories",
  //     //     "#id": "id",
  //     //     "#name": "name",
  //     //   },
  //     // };
  //     console.log(params);

  //     const response = await this.ddbClient.send(new ScanCommand(params));

  //     return response;
  //   } catch (error: any) {
  //     throw new Error(
  //       `[Error - ECR] An error occurred calling the category Command: ${error.message}`
  //     );
  //   }
  // }

  async getProducts(
    tableName: string,
    categoryId: string
  ): Promise<ScanCommandOutput> {
    try {
      // const expression: string[] = [];
      // const attributeValues: any = {};
      // const attributeNames: any = {};
      // let filterExpression = categoryIds.forEach((item: string, index) => {
      //   expression.push(`contains(#${index}, :${index})`);
      //   attributeValues[`:${index}`] = { S: item };
      //   attributeNames[`#${index}`] = "id";
      // });

      const params = {
        TableName: tableName,
        FilterExpression: "contains(#a,:a)",
        ExpressionAttributeValues: {
          ":a": {
            S: categoryId,
          },
        },
        ProjectionExpression: "#id,#name,#banner_image,#images",
        ExpressionAttributeNames: {
          "#a": "categories",
          "#id": "id",
          "#name": "name",
          "#banner_image": "banner_image",
          "#images": "images",
        },
      };
      // const params = {
      //   TableName: tableName,
      //   FilterExpression: "contains(#master_categories,:master_categories)",
      //   ProjectionExpression: "#id,#name",
      //   ExpressionAttributeValues: {
      //     ":master_categories": {
      //       S: masterCategoryId,
      //     },
      //   },
      //   ExpressionAttributeNames: {
      //     "#master_categories": "master_categories",
      //     "#id": "id",
      //     "#name": "name",
      //   },
      // };
      console.log(params);

      const response = await this.ddbClient.send(new ScanCommand(params));

      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the category Command: ${error.message}`
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
        FilterExpression: "contains(#a,:a)",
        ExpressionAttributeValues: {
          ":a": {
            S: masterCategoryId,
          },
        },
        ProjectionExpression: "#id,#name,#banner_image,#image",
        ExpressionAttributeNames: {
          "#a": "master_categories",
          "#id": "id",
          "#name": "name",
          "#banner_image": "banner_image",
          "#image": "image",
        },
      };
      console.log(params);

      const response = await this.ddbClient.send(new ScanCommand(params));

      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the master Command: ${error.message}`
      );
    }
  }
}
