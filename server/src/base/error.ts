import dotenv from "dotenv";
import express from "express";
dotenv.config();

export interface IErrorInfo {
  status: number;
  code: string;
  message: string;
  data?: any;
}

export class BaseError extends Error {
  constructor(status: number, code: string, message: string, data?: any) {
    super(message);
    this.info = { status, code, message, data };
  }
  info: IErrorInfo;
}

export class BaseErrorHelper {
  static handleError(
    func: (req: express.Request, rep: express.Response) => Promise<any>
  ) {
    return (req: express.Request, res: express.Response) =>
      func
        .bind(this)(req, res)
        .catch((error: any) => {
          if (!error.info) {
            const err = this.somethingWentWrong();
            res.status(err.info.status).json(err.info);
            this.logUnknowError(error);
          } else {
            res.status(error.info.status).json(error.info);
          }
        });
  }
  static logUnknowError(error: Error) {
    console.log("*** UNKNOW ERROR ***");
    console.log(error);
    console.log("********************");
  }
  static logError(prefix: string, logOption = true) {
    return (error: any) => {
      console.log(
        prefix,
        error.message || error,
        logOption ? error.options : ""
      );
    };
  }
  // Unknow
  static somethingWentWrong(message?: string) {
    return new BaseError(500, "500", message || "Something is wrong");
  }
  // Auth
  static unauthorized() {
    return new BaseError(401, "401", "Unauthorized");
  }
  static badToken() {
    return new BaseError(401, "-1", "Bad Token");
  }
  static tokenExpired() {
    return new BaseError(401, "-2", "Expired token");
  }
  static permissionDeny() {
    return new BaseError(
      405,
      "-3",
      "You are not approved to access/ Permission deny"
    );
  }
}
