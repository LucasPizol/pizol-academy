import ReactPDF from "@react-pdf/renderer";
import { MyDocument } from "../lib/reactPdf";
import React from "react";
import { Activity } from "@prisma/client";

export interface ActivityDocument extends Activity {
  abilities: { id: number; name: string }[];
}

export abstract class ReactPdfService {
  static async saveData(filename: string, newData: ActivityDocument) {
    await ReactPDF.renderToFile(
      <MyDocument data={newData} />,
      `${__dirname}/../../files/${filename}.pdf`
    );
  }
}
