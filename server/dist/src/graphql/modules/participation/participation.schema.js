"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, apollo_server_express_1.gql) `
  extend type Query {
    getOneParticipation(id: ID!): Participation
    getAllParticipation: [Participation]
  }

  extend type Mutation {
    createParticipation(data: CreateParticipationInput!): Participation
    updateParticipation(id: ID!, data: UpdateParticipationInput!): Participation
    deleteOneParticipation(id: ID!): Participation
  }

  input CreateParticipationInput {
    "Participant id"
    userId: String
    "Conversation id"
    conversationId: String
    "CONNECT/DISCONNECT/BANNED"
    status: String
  }

  input UpdateParticipationInput {
    "CONNECT/DISCONNECT/BANNED"
    status: String
  }

  type Participation {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    "Participant id"
    userId: String
    "Conversation id"
    conversationId: String
    "CONNECT/DISCONNECT/BANNED"
    status: String
  }
`;
exports.default = schema;
//# sourceMappingURL=participation.schema.js.map