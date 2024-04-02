import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

async function createFolder(Bucket: string, Key: string, Body: any) {
  const client = new S3Client();
  const s3BaseUrl = "https://d2fsc8h6riwg8g.cloudfront.net/";
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body,
  });

  try {
    await client.send(command);
    return `${s3BaseUrl}${Key}`;
  } catch (error: any) {
    throw error;
  }
}

// async function existsFolder(Bucket: string, Key: string) {
//   const client = new S3Client();
//   const s3BaseUrl = "https://d2fsc8h6riwg8g.cloudfront.net/";
//   const command = new HeadObjectCommand({ Bucket, Key });

//   try {
//     await client.send(command);
//     return `${s3BaseUrl}${Key}`;
//   } catch (error: any) {
//     if (error.name === "NotFound") {
//       return false;
//     } else {
//       throw error;
//     }
//   }
// }

export async function createFolderIfNotExist(
  Bucket: string,
  Key: string,
  Body: any
) {
  // if (!(await existsFolder(Bucket, Key))) {
  return createFolder(Bucket, Key, Body);
  // }
  // return null;
}

// const uploadFileIntoS3 = async file => {
//     const ext = getFileExtension(file);
//     const options = {
//       Bucket: process.env.file_s3_bucket_name,
//       Key: `${uuidv4()}.${ext}`,
//       Body: file
//     };

//     try {
//       await s3.upload(options).promise();
//       console.log(
//         `File uploaded into S3 bucket: "${
//           process.env.file_s3_bucket_name
//         }", with key: "${fileName}"`
//       );
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const getFileExtension = file => {
//     const headers = file["headers"];
//     if (headers == null) {
//       throw new Error(`Missing "headers" from request`);
//     }

//     const contentType = headers["content-type"];
//     if (contentType == "image/jpeg") {
//       return "jpg";
//     }

//     throw new Error(`Unsupported content type "${contentType}".`);
//   };
