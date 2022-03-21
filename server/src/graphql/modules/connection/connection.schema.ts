import { gql } from "apollo-server-express";

const schema = gql`
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

export default schema;
