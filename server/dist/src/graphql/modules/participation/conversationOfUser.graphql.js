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
const conversation_service_1 = require("../conversation/conversation.service");
const participation_model_1 = require("./participation.model");
exports.default = {
    schema: (0, apollo_server_express_1.gql) `
    extend type Query {
      conversationOfUser: [Conversation]
    }
  `,
    resolver: {
        Query: {
            conversationOfUser: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                // Authorization
                helpers_1.AuthHelper.authorize(context);
                // Find all conversation of user
                const participationList = yield participation_model_1.ParticipationModel.find({
                    userId: { $in: [context.tokenData.userId] },
                });
                const conversationList = participationList.map((value) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield conversation_service_1.conversationService.findOne({
                        id: value.conversationId,
                    });
                }));
                return conversationList;
            }),
        },
    },
};
//# sourceMappingURL=conversationOfUser.graphql.js.map