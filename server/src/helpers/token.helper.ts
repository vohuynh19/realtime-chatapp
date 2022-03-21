import { configs } from "../configs";
import jwt from "jsonwebtoken";

export enum TokenType {
  USER = "USER",
  ACTIVE_PASSWORD = "ACTIVE_PASSWORD",
  RESET_PASSWORD = "RESET_PASSWORD",
  VERIFY_EMAIL = "VERIFY_EMAIL",
}
export interface IPayloadToken {
  [name: string]: any;
  type: TokenType;
  userId?: string;
  username?: string;
  email?: string;
}

export class TokenHelper {
  constructor() {}

  static generateToken(
    payload: IPayloadToken,
    expiresIn: string = "30d"
  ): string {
    return jwt.sign(payload, configs.secretKey, { expiresIn });
  }

  static decodeToken(token: string) {
    return jwt.verify(token, configs.secretKey);
  }
}
