import { Activity } from "@prisma/client";
import {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { envSchema } from "../lib/zod";
import { s3 } from "../s3client";

export interface ActivityDocument extends Activity {
  abilities: { id: number; name: string }[];
}

export abstract class ImageService {
  static async downloadFolder(classUrl: string, activityUrl: string) {
    const pdf = await s3.send(
      new ListObjectsV2Command({
        Bucket: envSchema.BUCKET_NAME,
        Prefix: `sendedActivities/\n          ${classUrl}/\n          ${activityUrl}/\n`,
      })
    );


    if (!pdf.Contents) return;

    const filesPromises = pdf.Contents.map((content) => {
      if (!content.Key) return;

      return ImageService.downloadFile(content?.Key);
    });

    const resolvedPromises = await Promise.all(filesPromises);

    //const pdfFile = await pdf.Body?.transformToByteArray();

    return resolvedPromises;
  }

  static async downloadFile(key: string) {
    const string = key.split("/");

    const newString = string.map((string) => string.replace("\n", "").trim());

    const pdf = await s3.send(
      new GetObjectCommand({
        Bucket: envSchema.BUCKET_NAME,
        Key: key,
      })
    );

    const pdfFile = await pdf.Body?.transformToByteArray();

    return {
      folderName: newString[3],
      fileName: newString[4],
      pdfFile,
    };
  }
}
