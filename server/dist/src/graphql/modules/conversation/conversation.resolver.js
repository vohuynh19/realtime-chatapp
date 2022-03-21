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
const conversation_service_1 = require("./conversation.service");
const helpers_1 = require("../../../helpers");
const participation_service_1 = require("../participation/participation.service");
const Query = {
    getAllConversation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield conversation_service_1.conversationService.findAll();
    }),
    getOneConversation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield conversation_service_1.conversationService.findOne({ _id: id });
    }),
};
const Mutation = {
    createConversation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        const hostIdArr = data.hostIdArr;
        if (!hostIdArr.includes(context.tokenData.userId)) {
            throw helpers_1.ErrorHelper.unauthorized();
        }
        // save to db
        const conversation = yield conversation_service_1.conversationService.create(data);
        // create participation object
        participation_service_1.participationService.create({
            userId: context.tokenData.userId,
            conversationId: conversation._id,
            status: "CONNECT",
        });
        return conversation;
    }),
    updateConversation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, data } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        const hostIdArr = data.hostIdArr;
        if (!hostIdArr.includes(context.tokenData.userId)) {
            throw helpers_1.ErrorHelper.permissionDeny();
        }
        // Update Conversation
        return yield conversation_service_1.conversationService.updateOne(id, data);
    }),
    deleteOneConversation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Delete Conversation
        return yield conversation_service_1.conversationService.deleteOne(id);
    }),
};
exports.default = {
    Query,
    Mutation,
};
//# sourceMappingURL=conversation.resolver.js.map