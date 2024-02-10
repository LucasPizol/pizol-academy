import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { UserService } from "../services/userService";

export abstract class UsersController {
  static async get(req: AuthRequest, res: Response) {
    const { company } = req.user!;

    try {
      const users = await UserService.getByClass(company.id);
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
