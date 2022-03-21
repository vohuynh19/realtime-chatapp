import { gql } from "apollo-server-express";

const schema = gql`
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

export default schema;
