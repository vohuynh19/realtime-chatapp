"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseErrorHelper = exports.BaseError = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class BaseError extends Error {
    constructor(status, code, message, data) {
        super(message);
        this.info = { status, code, message, data };
    }
}
exports.BaseError = BaseError;
class BaseErrorHelper {
    static handleError(func) {
        return (req, res) => func
            .bind(this)(req, res)
            .catch((error) => {
            if (!error.info) {
                const err = this.somethingWentWrong();
                res.status(err.info.status).json(err.info);
                this.logUnknowError(error);
            }
            else {
                res.status(error.info.status).json(error.info);
            }
        });
    }
    static logUnknowError(error) {
        console.log("*** UNKNOW ERROR ***");
        console.log(error);
        console.log("********************");
    }
    static logError(prefix, logOption = true) {
        return (error) => {
            console.log(prefix, error.message || error, logOption ? error.options : "");
        };
    }
    // Unknow
    static somethingWentWrong(message) {
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
        return new BaseError(405, "-3", "You are not approved to access/ Permission deny");
    }
}
exports.BaseErrorHelper = BaseErrorHelper;
//# sourceMappingURL=error.js.map