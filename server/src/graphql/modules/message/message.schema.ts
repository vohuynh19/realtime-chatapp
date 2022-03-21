import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getOneMessage(id: ID!): Message
    getAllMessage: [Message]
  }

  extend type Mutation {
    createMessage(data: CreateMessageInput!): Message
    updateMessage(id: ID!, data: UpdateMessageInput!): Message
    deleteOneMessage(id: ID!): Message
  }
  extend type Subscription {
    messages(id: ID!): Message
  }
  input CreateMessageInput {
    "Conversation Id"
    conversationId: String!
    "[IMAGE,VIDEO,TEXT]"
    contentType: [String]!
    "Image link"
    imageLink: String
    "Video Link"
    videoLink: String
    "Text Content"
    textContent: String
  }

  input UpdateMessageInput {
    "[IMAGE,VIDEO,TEXT]"
    contentType: [String]
    "Image link"
    imageLink: String
    "Video Link"
    videoLink: String
    "Text Content"
    textContent: String
    "SUCCESS/FAIL/PENDING"
    status: String
  }

  type Message {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    "Sender Id"
    senderId: String
    "Conversation Id"
    conversationId: String
    "[IMAGE,VIDEO,TEXT]"
    contentType: [String]
    "Image link"
    imageLink: String
    "Video Link"
    videoLink: String
    "Text Content"
    textContent: String
    "SUCCESS/FAIL/PENDING"
    status: String
  }
`;

export default schema;
