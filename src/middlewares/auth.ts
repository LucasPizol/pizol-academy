import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/jwtService";
import { UserService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";

type User = {
  id: number;
  name: string;
  username: string;
  company: {
    id: number;
    name: string;
  };
};

export interface AuthRequest extends Request {
  user?: User;
}

export abstract class AuthMiddleware {
  static async checkAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) return res.status(401).json({ error: "Token inválido" });

    JwtService.validateToken(token, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({ error: "Token inválido" });
      }

      const user = await UserService.getByUsername(
        (decoded as JwtPayload).username
      );

      if (!user) {
        return res.status(401).json({ error: "Token inválido" });
      }

      req.user = {
        company: user.Company,
        id: user.id,
        name: user.name,
        username: user.username,
      };

      next();
    });
  }
}
