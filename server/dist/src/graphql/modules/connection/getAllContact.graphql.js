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
const connection_model_1 = require("./connection.model");
exports.default = {
    schema: (0, apollo_server_express_1.gql) `
    extend type Query {
      getAllContact(type: String): [Connection]
    }
  `,
    resolver: {
        Query: {
            getAllContact: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                // PENDING/SUCCESS/FAIL/CLOSE for dynamically filtering
                const { type } = args;
                // Authorization
                helpers_1.AuthHelper.authorize(context);
                return yield connection_model_1.ConnectionModel.find({ senderId: context.tokenData.userId }, { status: type });
            }),
        },
    },
};
//# sourceMappingURL=getAllContact.graphql.js.map