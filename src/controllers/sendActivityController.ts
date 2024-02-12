import { AuthRequest } from "../middlewares/auth";
import path from "path";
import fs from "fs";
import { Response } from "express";
import { SendActivityService } from "../services/sendActivityService";

export abstract class SendActivityController {
  static async create(req: AuthRequest, res: Response) {
    const { id, name } = req.user!;
    const { filesBase64, myClass, activity } = req.body;

    try {
      const sendActivity = await SendActivityService.create(id, activity.id);

      const mappedFunctions = filesBase64.map((file: string, index: number) => {
        return SendActivityService.saveImage(
          `sendedActivities/
          Classe ${myClass.ownerId} - ${myClass.name} - ${myClass.owner.name}/
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
}
