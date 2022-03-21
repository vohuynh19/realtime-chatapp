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
const user_service_1 = require("./user.service");
const helpers_1 = require("../../../helpers");
const Query = {
    getAllUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield user_service_1.userService.findAll();
    }),
    getOneUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield user_service_1.userService.findOne({ _id: id });
    }),
};
const Mutation = {
    createUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        // Validate email
        yield helpers_1.AuthHelper.validateEmail(data.email);
        // Encode password
        data.password = yield helpers_1.AuthHelper.encodePassword(data.password);
        // save to db
        return yield user_service_1.userService.create(data);
    }),
    updateUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Update User
        const { id, data } = args;
        return yield user_service_1.userService.updateOne(id, data);
    }),
    deleteOneUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Delete user
        return yield user_service_1.userService.deleteOne(id);
    }),
};
exports.default = {
    Query,
    Mutation,
};
//# sourceMappingURL=user.resolver.js.map