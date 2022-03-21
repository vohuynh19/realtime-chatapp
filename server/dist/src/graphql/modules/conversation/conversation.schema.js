"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, apollo_server_express_1.gql) `
  extend type Query {
    getOneConversation(id: ID!): Conversation
    getAllConversation: [Conversation]
  }

  extend type Mutation {
    createConversation(data: CreateConversationInput!): Conversation
    updateConversation(id: ID!, data: UpdateConversationInput!): Conversation
    deleteOneConversation(id: ID!): Conversation
  }

  input CreateConversationInput {
    "Conversation title"
    title: String!
    "Avatar URL of conversation"
    avatarUrl: String!
    "GROUP/PERSONAL"
    type: String!
    "Host of conversation Array"
    hostIdArr: [String]
  }

  input UpdateConversationInput {
    "Conversation title"
    title: String
    "Avatar URL of conversation"
    avatarUrl: String
    "GROUP/PERSONAL"
    type: String
    "Host of conversation Array"
    hostIdArr: [String]
  }

  type Conversation {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    "Conversation title"
    title: String
    "Avatar URL of conversation"
    avatarUrl: String
    "GROUP/PERSONAL"
    type: String
    "Host of conversation Array"
    hostIdArr: [String]
  }
`;
exports.default = schema;
//# sourceMappingURL=conversation.schema.js.map