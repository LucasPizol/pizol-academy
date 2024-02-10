import jwt from "jsonwebtoken";
import { envSchema } from "../lib/zod";

const secretKey = envSchema.JSON_TOKEN;

export abstract class JwtService {
  static validateToken(token: string, callback: jwt.VerifyCallback) {
    jwt.verify(token, secretKey, callback);
  }

  static signInToken(payload: string | object | Buffer, expiration: string) {
    return jwt.sign(payload, secretKey, {
      expiresIn: expiration,
    });
  }
}
