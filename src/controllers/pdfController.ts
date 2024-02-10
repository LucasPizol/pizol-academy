import path from "path";
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";
import JSZip from "jszip";
import fs from "fs";

export abstract class PdfController {
  static async download(req: AuthRequest, res: Response) {
    const { pdf_file_url } = req.body;
    try {
      const pdfPath = path.join(
        __dirname,
        "..",
        "..",
        "files",
        pdf_file_url + ".pdf"
      );

      return res.status(200).sendFile(pdfPath);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async downloadMany(req: AuthRequest, res: Response) {
    const { pdfs } = req.body;

    try {
      const zip = new JSZip();

      pdfs.forEach((pdf: string) => {
        const pdfPath = path.join(__dirname, "..", "..", "files", pdf + ".pdf");

        const file = fs.readFileSync(pdfPath);

        zip.file(pdf + ".pdf", file);
      });

      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
      fs.writeFileSync("./files/files.zip", zipBuffer);

      res.set("Content-Type", "application/zip");
      res.set("Content-Disposition", "attachment; filename=files.zip");

      return res.status(200).send(zipBuffer);
    } catch (error) {
      if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    }
  }
}
