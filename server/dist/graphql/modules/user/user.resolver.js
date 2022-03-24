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
const auth_1 = require("../../../helpers/auth");
const user_service_1 = require("./user.service");
const Query = {
    getOneUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Authorization
         */
        auth_1.AuthHelper.rolePermission(context, [auth_1.UserRole.ADMIN]);
        const { id } = args;
        return yield user_service_1.userService.findOne({ id: id });
    }),
    getAllUsers: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Authorization
         */
        auth_1.AuthHelper.rolePermission(context, [auth_1.UserRole.ADMIN]);
        const { q } = args;
        return yield user_service_1.userService.fetch(q);
    }),
};
const Mutation = {
    createUser: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        /**
         * Validate email
         */
        yield auth_1.AuthHelper.validateEmail(data.email);
        /**
         * Encode password
         */
        data.password = yield auth_1.AuthHelper.encodePassword(data.password);
        /**
         * Save to database
         */
        return yield user_service_1.userService.create(data);
    }),
    updateUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Authorization
         */
        auth_1.AuthHelper.rolePermission(context, [auth_1.UserRole.ADMIN]);
        /**
         * Update user
         */
        const { id, data } = args;
        return yield user_service_1.userService.updateOne(id, data);
    }),
    deleteOneUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Authorization
         */
        auth_1.AuthHelper.rolePermission(context, [auth_1.UserRole.ADMIN]);
        const { id } = args;
        /**
         * Delete user
         */
        return yield user_service_1.userService.deleteOne(id);
    }),
};
exports.default = {
    Query,
    Mutation,
};
//# sourceMappingURL=user.resolver.js.map