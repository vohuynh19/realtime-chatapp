import { gql } from "apollo-server-express";

const schema = gql`
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

export default schema;
