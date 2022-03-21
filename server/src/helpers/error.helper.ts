import { BaseErrorHelper, BaseError } from "../base/error";

export class ErrorHelper extends BaseErrorHelper {
  static userNotExist() {
    return new BaseError(403, "-103", "User does not exist");
  }
  static userExisted() {
    return new BaseError(403, "-104", "User existed");
  }
  static userError(message: string) {
    return new BaseError(403, "-106", "User error: " + message);
  }

  static duplicateError(key: string) {
    return new BaseError(403, "-107", `${key} is coincident.`);
  }
  static readOnlyError(key: string) {
    return new BaseError(403, "-108", `${key} is only readable .`);
  }
  static createUserError(message: string) {
    return new BaseError(401, "-109", `User creating error: ${message}`);
  }
  static updateUserError(message: string) {
    return new BaseError(401, "-110", `User updating error: ${message}`);
  }
  static userPasswordNotCorrect() {
    return new BaseError(403, "-111", "Password is wrong");
  }
  static connectionExisted() {
    return new BaseError(403, "-112", "Connection existed");
  }
  static connectionNotExisted() {
    return new BaseError(403, "-112", "Connection does not exist");
  }
}
