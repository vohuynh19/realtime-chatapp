"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class BaseError extends Error {
    constructor(status, code, message, data) {
        super(message);
        this.info = { status, code, message, data };
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=error.js.map