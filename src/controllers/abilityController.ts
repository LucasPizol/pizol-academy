import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { AbilityService } from "../services/abilityService";

export abstract class AbilityController {
  static async get(req: AuthRequest, res: Response) {
    try {
      const abilities = await AbilityService.get();
      return res.status(200).json(abilities);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
