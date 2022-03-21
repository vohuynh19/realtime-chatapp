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
const user_model_1 = require("./user.model");
exports.default = {
    schema: (0, apollo_server_express_1.gql) `
    extend type Query {
      login(email: String!, password: String!): LoginData
    }
    type LoginData {
      user: User
      token: String
    }
  `,
    resolver: {
        Query: {
            login: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const { email, password } = args;
                const user = yield user_model_1.UserModel.findOne({ email: email });
                // Check password
                yield helpers_1.AuthHelper.comparePassword(password, user.password);
                console.log(user._id.toString());
                // Generate token
                return {
                    user: yield user.save(),
                    token: helpers_1.TokenHelper.generateToken({
                        type: helpers_1.TokenType.USER,
                        userId: user._id.toString(),
                        username: user.username,
                        email: user.email,
                    }),
                };
            }),
        },
    },
};
//# sourceMappingURL=login.graphql.js.map