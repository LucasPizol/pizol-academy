import { AuthRequest } from "../middlewares/auth";
import path from "path";
import fs from "fs";
import { Response } from "express";
import { SendActivityService } from "../services/sendActivityService";
import { ImageService } from "../services/imageService";
import JSZip from "jszip";

export abstract class SendActivityController {
  static async create(req: AuthRequest, res: Response) {
    const { id, name } = req.user!;
    const { filesBase64, myClass, activity } = req.body;

    try {
      const sendActivity = await SendActivityService.create(id, activity.id);

      const mappedFunctions = filesBase64.map((file: string, index: number) => {
        return SendActivityService.saveImage(
          `sendedActivities/
          Classe ${myClass.id} - ${myClass.name} - ${myClass.owner.name}/
          Atividade ${activity.id} - ${activity.title}/
          Aluno ${id} - ${name}`,
          file,
          String(index)
        );
      });

      await Promise.all(mappedFunctions);

      return res.status(200).json(sendActivity);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async getByActivity(req: AuthRequest, res: Response) {
    const { activityId } = req.params;

    try {
      const activities = await SendActivityService.getByActivity(
        Number(activityId)
      );
      return res.status(200).json(activities);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async getSendActivity(req: AuthRequest, res: Response) {
    const { sendActivityId } = req.body;

    const zip = new JSZip();

    try {
      const sendActivity = await SendActivityService.getById(
        Number(sendActivityId)
      );

      if (!sendActivity)
        return res.status(404).json({ error: "Não encontrado" });

      const { activity, user, activityId } = sendActivity;

      const classUrl = `Classe ${activity.class.id} - ${activity.class.name} - ${activity.user.name}`;
      const activityUrl = `Atividade ${activityId} - ${activity.title}`;

      const files = await ImageService.downloadFolder(classUrl, activityUrl);

      if (!files) return;

      files.forEach((file) => {
        if (!file) return;
        if (!file.pdfFile) return;

        const folder = zip.folder(file.folderName);
        folder?.file(file.fileName, file.pdfFile);
      });

      const generatedZip = await zip.generateAsync({ type: "nodebuffer" });

      return res.status(200).send(generatedZip);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
