"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, apollo_server_express_1.gql) `
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
exports.default = schema;
//# sourceMappingURL=notification.schema.js.map