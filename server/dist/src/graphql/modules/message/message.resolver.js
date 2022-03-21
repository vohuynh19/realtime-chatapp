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
const message_service_1 = require("./message.service");
const helpers_1 = require("../../../helpers");
const participation_model_1 = require("../participation/participation.model");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
const Query = {
    getAllMessage: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield message_service_1.messageService.findAll();
    }),
    getOneMessage: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield message_service_1.messageService.findOne({ _id: id });
    }),
};
const Mutation = {
    createMessage: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        data.senderId = context.tokenData.userId;
        // If user joined in conversation, Set status of message SUCCESS.
        // Otherwise,  the status of message is PEDNING as default
        const participation = yield participation_model_1.ParticipationModel.find({
            conversationId: data.conversationId,
            userId: context.tokenData.userId,
        });
        if (participation.length) {
            data.status = "SUCCESS";
        }
        // save to db
        const message = yield message_service_1.messageService.create(data);
        // notifiy to listener
        pubsub.publish(data.conversationId, {
            messages: message,
        });
        return message;
    }),
    updateMessage: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Update Message
        const { id, data } = args;
        return yield message_service_1.messageService.updateOne(id, data);
    }),
    deleteOneMessage: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Delete Message
        return yield message_service_1.messageService.deleteOne(id);
    }),
};
const Subscription = {
    messages: {
        subscribe: (root, args, context) => {
            const { id } = args;
            return pubsub.asyncIterator(id);
        },
    },
};
exports.default = {
    Query,
    Mutation,
    Subscription,
};
//# sourceMappingURL=message.resolver.js.map