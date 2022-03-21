"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelper = exports.TokenType = void 0;
const configs_1 = require("../configs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TokenType;
(function (TokenType) {
    TokenType["USER"] = "USER";
    TokenType["ACTIVE_PASSWORD"] = "ACTIVE_PASSWORD";
    TokenType["RESET_PASSWORD"] = "RESET_PASSWORD";
    TokenType["VERIFY_EMAIL"] = "VERIFY_EMAIL";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
class TokenHelper {
    constructor() { }
    static generateToken(payload, expiresIn = "30d") {
        return jsonwebtoken_1.default.sign(payload, configs_1.configs.secretKey, { expiresIn });
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.verify(token, configs_1.configs.secretKey);
    }
}
exports.TokenHelper = TokenHelper;
//# sourceMappingURL=token.helper.js.map