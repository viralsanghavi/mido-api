/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import {marshall} from "@aws-sdk/util-dynamodb";
import {NodeHttpHandler} from "@smithy/node-http-handler";
import {v4 as uuid} from "uuid";
import {SESClient, SendEmailCommand} from "@aws-sdk/client-ses"; // ES Modules import

export class SdkCalls {
  private ddbClient: DynamoDBClient;
  private sesClient: SESClient;

  constructor(region: string) {
    this.ddbClient = new DynamoDBClient({
      region: region,
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 3000,
        socketTimeout: 2000,
      }),
      // endpoint: "http://host.docker.internal:8000",
    });
    this.sesClient = new SESClient();
  }

  //   Update the below later
  //   /**
  //    * Applies the specified lifecycle rule to provided repository.
  //    * @param {string} repositoryName - An repository name.
  //    * @param {string} policyText - The JSON representation of the lifecycle policy.
  //    * @returns {Promise<void>} - Resolves when the lifecycle rules are applied.
  //    */
  async contactForm(
    tableName: string,
    body: any
  ): Promise<PutItemCommandOutput> {
    try {
      const id: string = uuid();
      const response = await this.ddbClient.send(
        new PutItemCommand({
          TableName: tableName,
          Item: marshall({
            id: id,
            name: body.name,
            phone: body.phone,
            email: body.email,
            created_at: Date.now(),
          }),
        })
      );
      this.sendEmail(body);
      return response;
    } catch (error: any) {
      throw new Error(
        `[Error - ECR] An error occurred calling the Put Command: ${error}`
      );
    }
  }
  async sendEmail(body: any) {
    try {
      const input = {
        // SendEmailRequest
        Source: "hello@midogift.in", // required
        Destination: {
          // Destination
          ToAddresses: [
            // AddressList
            body?.email,
            "hello@midogift.in",
          ],
          BccAddresses: ["vsanghavi3@gmail.com"],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `We have received your request: ${body.name}. Your message ${body?.message}`,
            },
            Text: {
              Charset: "UTF-8",
              Data: "This is the message body in text format.",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Test email",
          },
        },
        ReplyToAddresses: ["hello@midogift.in"],
      };
      const command = new SendEmailCommand(input);
      const response = await this.sesClient.send(command);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error(
        `[Error - SES] An error occurred calling the SES command: ${error}`
      );
    }
  }
}
