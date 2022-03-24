import express from "express";
import { BaseError } from "../base/error";
export class ErrorHelper {
  /**
   * Handle basic error
   */
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

  /**
   * Log unknow error
   */
  static logUnknowError(error: Error) {
    console.log("*** UNKNOW ERROR ***");
    console.log(error);
    console.log("********************");
  }

  /**
   * Log error
   */
  static logError(prefix: string, logOption = true) {
    return (error: any) => {
      console.log(
        prefix,
        error.message || error,
        logOption ? error.options : ""
      );
    };
  }

  /**
   * Error case
   */

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
    return new BaseError(401, "-2", "Token is exprired");
  }
  static permissionDeny() {
    return new BaseError(405, "-3", "You are not allow to access");
  }
  // Request
  static requestDataInvalid(message: string) {
    return new BaseError(403, "-4", "Unvalid request data " + message);
  }
  // External Request
  static externalRequestFailed(message: string) {
    return new BaseError(500, "-5", message);
  }
  // Mongo
  static mgRecoredNotFound(objectName: string = "request object") {
    return new BaseError(404, "-7", "Not found " + objectName);
  }
  static mgQueryFailed(message: string) {
    return new BaseError(403, "-8", message || "Query Fail");
  }
  static recoredNotFound(message: string) {
    return new BaseError(404, "-10", `Record is not found: ${message}`);
  }
  // User Login
  static passwordNotCorrect() {
    return new BaseError(409, "409", "Password is not correct");
  }
  static unavalableEmailError() {
    return new BaseError(409, "409", "This email is already registered");
  }
}
