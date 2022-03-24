"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHelper = void 0;
const error_1 = require("../base/error");
class ErrorHelper {
    /**
     * Handle basic error
     */
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
    /**
     * Log unknow error
     */
    static logUnknowError(error) {
        console.log("*** UNKNOW ERROR ***");
        console.log(error);
        console.log("********************");
    }
    /**
     * Log error
     */
    static logError(prefix, logOption = true) {
        return (error) => {
            console.log(prefix, error.message || error, logOption ? error.options : "");
        };
    }
    /**
     * Error case
     */
    // Unknow
    static somethingWentWrong(message) {
        return new error_1.BaseError(500, "500", message || "Something is wrong");
    }
    // Auth
    static unauthorized() {
        return new error_1.BaseError(401, "401", "Unauthorized");
    }
    static badToken() {
        return new error_1.BaseError(401, "-1", "Bad Token");
    }
    static tokenExpired() {
        return new error_1.BaseError(401, "-2", "Token is exprired");
    }
    static permissionDeny() {
        return new error_1.BaseError(405, "-3", "You are not allow to access");
    }
    // Request
    static requestDataInvalid(message) {
        return new error_1.BaseError(403, "-4", "Unvalid request data " + message);
    }
    // External Request
    static externalRequestFailed(message) {
        return new error_1.BaseError(500, "-5", message);
    }
    // Mongo
    static mgRecoredNotFound(objectName = "request object") {
        return new error_1.BaseError(404, "-7", "Not found " + objectName);
    }
    static mgQueryFailed(message) {
        return new error_1.BaseError(403, "-8", message || "Query Fail");
    }
    static recoredNotFound(message) {
        return new error_1.BaseError(404, "-10", `Record is not found: ${message}`);
    }
}
exports.ErrorHelper = ErrorHelper;
//# sourceMappingURL=error.js.map