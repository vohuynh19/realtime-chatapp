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
const notification_service_1 = require("./notification.service");
const helpers_1 = require("../../../helpers");
const Query = {
    getAllNotification: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield notification_service_1.notificationService.findAll();
    }),
    getOneNotification: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield notification_service_1.notificationService.findOne({ _id: id });
    }),
};
const Mutation = {
    createNotification: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // save to db
        return yield notification_service_1.notificationService.create(data);
    }),
    updateNotification: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Update Notification
        const { id, data } = args;
        return yield notification_service_1.notificationService.updateOne(id, data);
    }),
    deleteOneNotification: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Delete Notification
        return yield notification_service_1.notificationService.deleteOne(id);
    }),
};
exports.default = {
    Query,
    Mutation,
};
//# sourceMappingURL=notification.resolver.js.map