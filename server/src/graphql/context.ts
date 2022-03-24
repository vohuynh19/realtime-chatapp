import { Request } from "express";
import { _ } from "lodash";
import { TokenHelper } from "../helpers/token";
import { TokenExpiredError } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export type TokenData = {
  userId: string;
  email: string;
  username: string;
  role: string;
};

export class Context {
  req: Request;
  connection: any;
  isAuth: boolean;
  tokenData: TokenData;
  isTokenExpired = false;

  constructor(params: { req?: Request; connection?: any }) {
    this.req = params.req;
    this.connection = params.connection;
    this.parseToken(params);
  }

  /**
   * Parse account token every request
   */
  parseToken(params: any) {
    try {
      const { req } = params;
      let token;

      /**
       * Get x-token
       */
      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }
      /**
       * Decode token
       */
      if (token) {
        const decodedToken: any = TokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      /**
       * Check isExpired
       */
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }
}

/**
 * onContext is called every query
 */
export async function onContext(params: any) {
  const context: Context = new Context(params);
  return context;
}
