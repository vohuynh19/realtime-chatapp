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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onContext = exports.Context = void 0;
const lodash_1 = require("lodash");
const token_1 = require("../helpers/token");
const jsonwebtoken_1 = require("jsonwebtoken");
class Context {
    constructor(params) {
        this.isTokenExpired = false;
        this.req = params.req;
        this.connection = params.connection;
        this.parseToken(params);
    }
    /**
     * Parse account token every request
     */
    parseToken(params) {
        try {
            const { req } = params;
            let token;
            /**
             * Get x-token
             */
            if (req) {
                this.req = req;
                token = lodash_1._.get(req, "headers.x-token") || lodash_1._.get(req, "query.x-token");
            }
            /**
             * Decode token
             */
            if (token) {
                const decodedToken = token_1.TokenHelper.decodeToken(token);
                this.isAuth = true;
                this.tokenData = decodedToken;
            }
        }
        catch (err) {
            /**
             * Check isExpired
             */
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
/**
 * onContext is called every query
 */
function onContext(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = new Context(params);
        return context;
    });
}
exports.onContext = onContext;
//# sourceMappingURL=context.js.map