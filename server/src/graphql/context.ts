import _ from "lodash";
import { TokenHelper } from "../helpers/token.helper";
import { TokenExpiredError } from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";

export type TokenData = {
  userId: string;
  email: string;
  username: string;
};

export class Context {
  req: Request;
  isAuth = false;
  isTokenExpired = false;
  tokenData: TokenData;

  constructor(params: { req?: Request }) {
    this.parseToken(params);
  }
  parseToken(params: any) {
    try {
      const { req } = params;
      let token;

      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }

      if (token) {
        const decodedToken: any = TokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }
}

export async function onContext(params: any) {
  const context: Context = new Context(params);
  return context;
}
