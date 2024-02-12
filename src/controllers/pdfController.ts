import path from "path";
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";
import fs from "fs";
import { ReactPdfService } from "../services/reactPdfService";
import { RandomString } from "../helpers/randomString";

export abstract class PdfController {
  static async download(req: AuthRequest, res: Response) {
    const { pdf_file_url } = req.body;
    try {
      const dirName = RandomString.generateRandomString(8);

      const pdfPath = path.join(__dirname, "..", "files", dirName);

      if (!fs.existsSync(pdfPath)) {
        fs.mkdirSync(pdfPath, { recursive: true });
      }

      const pdfFile = await ReactPdfService.downloadFile(
        path.join(pdfPath, pdf_file_url + ".pdf"),
        pdf_file_url
      );

      if (!pdfFile)
        return res.status(404).json({ error: "Arquivo não encontrado" });

      fs.rmSync(pdfPath, { recursive: true, force: true });

      return res.status(200).send(pdfFile);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
