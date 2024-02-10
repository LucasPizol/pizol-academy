import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { ClassHasUserService } from "../services/classHasUserService";
import { ClassService } from "../services/classService";

export abstract class ClassHasUserController {
  static async joinClass(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const { invite_code } = req.body;

    if (!invite_code) {
      return res.status(404).json({ error: "Sala de aula não identificada" });
    }

    const getClass = await ClassService.getByInviteCode(invite_code);

    if (!getClass) {
      return res.status(404).json({ error: "Sala de aula não identificada" });
    }

    const isParticipating = getClass.class.find(({ userId }) => userId === id);

    if (isParticipating) {
      return res
        .status(400)
        .json({ error: "Você já está participando deste grupo." });
    }

    try {
      const joinClass = await ClassHasUserService.joinClass(
        id,
        Number(getClass.id),
        "student"
      );

      return res.status(200).json(joinClass);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  static async leaveClass(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const { classId } = req.body;

    try {
      const leaveClass = await ClassHasUserService.leaveClass(
        id,
        Number(classId)
      );

      return res.status(200).json(leaveClass);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async updateClassName(req: AuthRequest, res: Response) {
    const { classId, name } = req.body;
    const { id } = req.user!;

    try {
      const getClass = await ClassService.getById(classId, id);
      if (getClass?.ownerId !== id)
        return res
          .status(401)
          .json({ error: "Você não é o dono desta sala de aula" });

      await ClassService.updateName(classId, name);

      return res.status(200).send();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: AuthRequest, res: Response) {
    const { id } = req.user!;

    try {
      const getClass = await ClassHasUserService.getAll(id);

      return res.status(200).json(getClass);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
