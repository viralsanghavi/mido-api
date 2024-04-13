// import { EcrSdkCalls } from './lib/ecr-sdk-calls';

import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { SdkCalls } from "./lib/sdkcall";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  getResponse,
  HTTP_STATUS_CODES,
} from "node-api-helpers/build/api/index.js";

// Get Environment variables
const region = process.env.REGION || process.env.AWS_DEFAULT_REGION;

export const handler = async function (): Promise<any> {
  try {
    // Initialize SDK calls

    console.log("asdfghjkasdfghjkl");

    const sdkCalls = new SdkCalls(`${region}`);
    const response = await sdkCalls.getHomePageData("ui_config", "Home");
    let elements: any = [];
    let data = unmarshall(response.Item!);
    for (let index = 0; index < data.elements.length; index++) {
      const element = data.elements[index];
      if (element.type === "categories") {
        const response = await sdkCalls.getItem("categories", element.id);
        let category = unmarshall(response.Item!);
        let products = await sdkCalls.getProducts("products", category.id);
        console.log(products, "viral");
        category["data"] = products.Items?.map((e: any) => {
          return unmarshall(e);
        });
        // data.element[index] = { ...data.element[index], ...category };

        // category.keys.forEach((element: any, key: any) => {
        //   data.elements[index][key] = element;
        // });
        data.elements[index]["object"] = category;
      } else {
        const response = await sdkCalls.getItem(
          "master_categories",
          element.id
        );
        let masterCategory = unmarshall(response.Item!);
        let categories = await sdkCalls.getCategories(
          "categories",
          masterCategory.id
        );
        console.log(categories, "viral");

        masterCategory["data"] = categories.Items?.map((e: any) => {
          return unmarshall(e);
        });

        // data.element[index] = { ...data.element[index], ...masterCategory };
        // masterCategory.forEach((element: any, key: any) => {
        //   data.elements[index][key] = element;
        // });
        data.elements[index]["object"] = masterCategory;
      }
    }
    // const categoriesData = data.elements.filter(
    //   (object: any) => object.type === "categories"
    // );
    // const masterCategoriesData = data.elements.filter(
    //   (object: any) => object.type === "master_categories"
    // );
    // console.log(categoriesData);
    // console.log(masterCategoriesData);

    // const products = (
    //   await sdkCalls.getProducts(
    //     "products",
    //     categoriesData.map((element: any) => element.id)
    //   )
    // ).Items?.map((value) => unmarshall(value));
    // const categories = (
    //   await sdkCalls.getCategories(
    //     "categories",
    //     masterCategoriesData.map((element: any) => element.id)
    //   )
    // ).Items?.map((value) => unmarshall(value));
    // console.log(products, "products");
    // console.log(categories, "categories");

    // // elements = [...elements,...categories.Items!,...masterCategories.Items!];
    // data.elements.sort((a: any, b: any) => a.order - b.order);
    // // console.log(data);

    // for (let index = 0; index < data.elements.length; index++) {
    //   const element = data.elements[index];
    //   console.log(element, "aaaa");

    //   if (data.type == "categories") {
    //     elements.push(products?.find((item) => item.id == element.id));
    //   } else if ((data.type = "master_categories")) {
    //     elements.push(categories?.find((item) => item.id == element.id));
    //   }
    // }
    console.log(data);

    return getResponse(
      {
        message: "Success",
        data: data.elements,
      },
      HTTP_STATUS_CODES.OK
    );
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `[Error] - Failed to execute lambda function: ${error.message}`
    );
  }
};
