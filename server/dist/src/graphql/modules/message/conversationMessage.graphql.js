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
const apollo_server_express_1 = require("apollo-server-express");
const helpers_1 = require("../../../helpers");
const participation_model_1 = require("../participation/participation.model");
const message_model_1 = require("./message.model");
exports.default = {
    schema: (0, apollo_server_express_1.gql) `
    extend type Query {
      getAllConversationMesssage(id: ID!): [Message]
    }
  `,
    resolver: {
        Query: {
            getAllConversationMesssage: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const { id } = args;
                // Authorization
                helpers_1.AuthHelper.authorize(context);
                // Check whether user participated in conversation or not
                const participation = yield participation_model_1.ParticipationModel.find({
                    conversationId: id,
                    userId: context.tokenData.userId,
                });
                if (!participation.length) {
                    throw helpers_1.ErrorHelper.permissionDeny();
                }
                // Return message order by timestamp //
                return yield message_model_1.MessageModel.find({
                    conversationId: id,
                }).sort({
                    createdAt: -1,
                });
            }),
        },
    },
};
//# sourceMappingURL=conversationMessage.graphql.js.map