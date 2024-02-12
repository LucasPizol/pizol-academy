import { renderToBuffer } from "@react-pdf/renderer";
import { MyDocument } from "../lib/reactPdf";
import React from "react";
import { Activity } from "@prisma/client";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { envSchema } from "../lib/zod";
import { s3 } from "../s3client";
import { RandomString } from "../helpers/randomString";

export interface ActivityDocument extends Activity {
  abilities: { id: number; name: string }[];
}

export abstract class ReactPdfService {
  static async saveData(filename: string, newData: ActivityDocument) {
    const stream = await renderToBuffer(<MyDocument data={newData} />);

    await s3.send(
      new PutObjectCommand({
        Bucket: envSchema.BUCKET_NAME,
        Key: "activiesPdf/" + filename + ".pdf",
        Body: stream,
      })
    );
  }

  static async downloadFile(pdf_file_url: string) {
    const pdf = await s3.send(
      new GetObjectCommand({
        Bucket: envSchema.BUCKET_NAME,
        Key: "activiesPdf/" + pdf_file_url + ".pdf",
      })
    );

    const pdfFile = await pdf.Body?.transformToByteArray();

    return pdfFile;
  }
}
