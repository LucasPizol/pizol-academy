import { AuthRequest } from "../middlewares/auth";
import path from "path";
import fs from "fs";
import { Response } from "express";
import { SendActivityService } from "../services/sendActivityService";

export abstract class SendActivityController {
  static async create(req: AuthRequest, res: Response) {
    const { id, name } = req.user!;
    const { filesBase64, myClass, activity } = req.body;

    const activityPath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      "sendedActivities",
      `${myClass.ownerId} - ${myClass.name} - ${myClass.owner.name}`,
      `${id} - ${name}`
    );

    if (!fs.existsSync(activityPath)) {
      fs.mkdirSync(activityPath, { recursive: true });
    }

    try {
      filesBase64.forEach((file: string, index: number) => {
        fs.writeFileSync(
          activityPath + `/${index} - ${name}.png`,
          file,
          "base64"
        );
      });

      const sendActivity = await SendActivityService.create(id, activity.id)

      return res.status(200).json(sendActivity)
    } catch (error) {
      if (error instanceof Error) console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
