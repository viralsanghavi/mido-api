/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandOutput,
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
  async updateCategory(
    tableName: string,
    id: string,
    category: any
  ): Promise<UpdateItemCommandOutput> {
    try {
      console.log(`Start udpate category: ${tableName}`);
      // const itemKeys = (
      //   Object.keys(category) as Array<keyof typeof category>
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
      const params = {
        TableName: tableName,
        Key: marshall({
          id: id,
        }),
        UpdateExpression: "SET name = :name",
        ExpressionAttributeValues: marshall({ ":name": category.name }),
        ExpressionAttributeNames: { name: "name" },
        // UpdateExpression: updateExpression,
        // ExpressionAttributeValues: expressionAttributeValues,
        // ReturnValues: "UPDATED_NEW",
      };
      console.log(params);
      const response = await this.ddbClient.send(new UpdateItemCommand(params));
      return response;
    } catch (error: any) {
      console.log(error, "======");
      throw new Error(
        `[Error - ECR] An error occurred calling the Scan Command: ${error.message}`
      );
    }
  }
}
