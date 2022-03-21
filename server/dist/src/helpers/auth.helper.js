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
exports.AuthHelper = void 0;
const helpers_1 = require("../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../graphql/modules/user/user.model");
class AuthHelper {
    constructor() { }
    static authorize(context) {
        if (!context.isAuth) {
            throw helpers_1.ErrorHelper.unauthorized();
        }
        return true;
    }
    static encodePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcrypt_1.default.genSaltSync(10);
            const encodedPassword = yield bcrypt_1.default.hash(password, salt);
            return encodedPassword;
        });
    }
    static comparePassword(password, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const same = yield bcrypt_1.default.compare(password, hashPassword);
            if (!same) {
                throw helpers_1.ErrorHelper.userPasswordNotCorrect();
            }
            return same;
        });
    }
    static validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email: email });
            if (user) {
                throw helpers_1.ErrorHelper.createUserError("Email is used by another account");
            }
            return true;
        });
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=auth.helper.js.map