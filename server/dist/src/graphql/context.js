"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onContext = exports.Context = void 0;
const lodash_1 = __importDefault(require("lodash"));
const token_helper_1 = require("../helpers/token.helper");
const jsonwebtoken_1 = require("jsonwebtoken");
class Context {
    constructor(params) {
        this.isAuth = false;
        this.isTokenExpired = false;
        this.parseToken(params);
    }
    parseToken(params) {
        try {
            const { req } = params;
            let token;
            if (req) {
                this.req = req;
                token = lodash_1.default.get(req, "headers.x-token") || lodash_1.default.get(req, "query.x-token");
            }
            if (token) {
                const decodedToken = token_helper_1.TokenHelper.decodeToken(token);
                this.isAuth = true;
                this.tokenData = decodedToken;
            }
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                this.isTokenExpired = true;
            }
            this.isAuth = false;
        }
        finally {
            return this;
        }
    }
}
exports.Context = Context;
function onContext(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = new Context(params);
        return context;
    });
}
exports.onContext = onContext;
//# sourceMappingURL=context.js.map