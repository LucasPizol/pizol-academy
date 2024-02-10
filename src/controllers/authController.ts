import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { JwtService } from "../services/jwtService";
import bcryptjs from "bcryptjs";
import { AuthRequest } from "../middlewares/auth";

export abstract class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({ error: "Informações inválidas de login" });
    }

    try {
      const user = await UserService.getByUsername(username);

      if (!user)
        return res.status(401).json({ error: "Usuário ou senha inválidos" });

      const isEqual = bcryptjs.compareSync(password, user.password);

      if (!isEqual)
        return res.status(401).json({ error: "Usuário ou senha inválidos" });

      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      const token = JwtService.signInToken(payload, "7d");

      return res.status(200).json({ ...payload, token });
    } catch (error) {
      if (error instanceof Error)
        return res.status(401).json({ error: error.message });
    }
  }

  static async register(req: Request, res: Response) {
    const { name, username, password, cnpj, companyName } = req.body;

    const getUser = await UserService.getByUsername(username);

    if (getUser) {
      return res.status(400).json({ error: "Usuário já existe." });
    }

    try {
      const hashPassword = bcryptjs.hashSync(password, 8);

      const user = await UserService.create(username, name, hashPassword);

      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      const token = JwtService.signInToken(payload, "7d");

      return res.status(200).json({ ...payload, token });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async getUser(req: AuthRequest, res: Response) {
    const user = req.user!;
    return res.status(200).json(user);
  }
}
