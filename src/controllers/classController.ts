import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { ClassService } from "../services/classService";
import { RandomString } from "../helpers/randomString";
import { ClassHasUserService } from "../services/classHasUserService";

export abstract class ClassController {
  static async getById(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const user = req.user!;

    try {
      const myClass = await ClassService.getById(Number(id), user.id);
      return res.status(200).json(myClass);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async create(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const { name } = req.body;

    let invite_code = "";

    async function checkFunction() {
      invite_code = RandomString.generateRandomString(7);
      const checkIfExists = await ClassService.getByInviteCode(invite_code);

      if (checkIfExists) {
        return checkFunction();
      }
    }

    await checkFunction();

    try {
      const myClass = await ClassService.create(name, id, invite_code);
      await ClassHasUserService.joinClass(id, myClass.id, "owner");
      return res.status(200).json(myClass);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
