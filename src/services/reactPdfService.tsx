import ReactPDF from "@react-pdf/renderer";
import { MyDocument } from "../lib/reactPdf";
import React from "react";
import { Activity } from "@prisma/client";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { envSchema } from "../lib/zod";
import fs from "fs";
import { s3 } from "../s3client";

export interface ActivityDocument extends Activity {
  abilities: { id: number; name: string }[];
}

export abstract class ReactPdfService {
  static async saveData(filename: string, newData: ActivityDocument) {
    const path = `${__dirname}/../../files/${filename}.pdf`;

    await ReactPDF.renderToFile(<MyDocument data={newData} />, path);

    const readFile = fs.readFileSync(path);

    fs.unlinkSync(path);

    await s3.send(
      new PutObjectCommand({
        Bucket: envSchema.BUCKET_NAME,
        Key: filename + ".pdf",
        Body: readFile,
      })
    );
  }

  static async downloadFile(path: string, pdf_file_url: string) {
    const pdf = await s3.send(
      new GetObjectCommand({
        Bucket: envSchema.BUCKET_NAME,
        Key: pdf_file_url + ".pdf",
      })
    );

    const pdfFile = await pdf.Body?.transformToByteArray();

    if (!pdfFile) return;

    fs.writeFileSync(path, pdfFile);

    const data = fs.readFileSync(path);

    return data;
  }
}
