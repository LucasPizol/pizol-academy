import path from "path";
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";
import { ReactPdfService } from "../services/reactPdfService";

export abstract class PdfController {
  static async download(req: AuthRequest, res: Response) {
    const { pdf_file_url } = req.body;
    try {
      const pdfFile = await ReactPdfService.downloadFile(pdf_file_url);

      if (!pdfFile)
        return res.status(404).json({ error: "Arquivo não encontrado" });

      return res.status(200).send(Buffer.from(pdfFile));
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
