import dotenv from "dotenv";

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
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
  info: IErrorInfo;
}
