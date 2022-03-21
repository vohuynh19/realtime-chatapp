import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getOneNotification(id: ID!): Notification
    getAllNotification: [Notification]
  }

  extend type Mutation {
    createNotification(data: CreateNotificationInput!): Notification
    updateNotification(id: ID!, data: UpdateNotificationInput!): Notification
    deleteOneNotification(id: ID!): Notification
  }

  input CreateNotificationInput {
    "Type of notification event (message, connect request,...)"
    eventType: String
    "Event Id"
    eventId: String
  }

  input UpdateNotificationInput {
    "Type of notification event (message, connect request,...)"
    eventType: String
    "Event Id"
    eventId: String
  }

  type Notification {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    "Type of notification event (message, connect request,...)"
    eventType: String
    "Event Id"
    eventId: String
  }
`;

export default schema;
