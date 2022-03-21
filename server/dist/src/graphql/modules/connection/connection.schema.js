"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, apollo_server_express_1.gql) `
  extend type Query {
    getOneConnection(id: ID!): Connection
    getAllConnection: [Connection]
  }

  extend type Mutation {
    createConnection(data: CreateConnectionInput!): Connection
    updateConnection(id: ID!, data: UpdateConnectionInput!): Connection
    deleteOneConnection(id: ID!): Connection
  }

  input CreateConnectionInput {
    "Sender Id"
    senderId: String
    "Receiver Id"
    receiverId: String
    "PENDING/SUCCESS/FAIL"
    status: String
  }

  input UpdateConnectionInput {
    "PENDING/SUCCESS/FAIL"
    status: String
  }

  type Connection {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    "Sender Id"
    senderId: String
    "Receiver Id"
    receiverId: String
    "PENDING/SUCCESS/FAIL"
    status: String
  }
`;
exports.default = schema;
//# sourceMappingURL=connection.schema.js.map