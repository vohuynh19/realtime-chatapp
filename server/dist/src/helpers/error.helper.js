"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHelper = void 0;
const error_1 = require("../base/error");
class ErrorHelper extends error_1.BaseErrorHelper {
    static userNotExist() {
        return new error_1.BaseError(403, "-103", "User does not exist");
    }
    static userExisted() {
        return new error_1.BaseError(403, "-104", "User existed");
    }
    static userError(message) {
        return new error_1.BaseError(403, "-106", "User error: " + message);
    }
    static duplicateError(key) {
        return new error_1.BaseError(403, "-107", `${key} is coincident.`);
    }
    static readOnlyError(key) {
        return new error_1.BaseError(403, "-108", `${key} is only readable .`);
    }
    static createUserError(message) {
        return new error_1.BaseError(401, "-109", `User creating error: ${message}`);
    }
    static updateUserError(message) {
        return new error_1.BaseError(401, "-110", `User updating error: ${message}`);
    }
    static userPasswordNotCorrect() {
        return new error_1.BaseError(403, "-111", "Password is wrong");
    }
    static connectionExisted() {
        return new error_1.BaseError(403, "-112", "Connection existed");
    }
    static connectionNotExisted() {
        return new error_1.BaseError(403, "-112", "Connection does not exist");
    }
}
exports.ErrorHelper = ErrorHelper;
//# sourceMappingURL=error.helper.js.map