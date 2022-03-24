import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getOneUser(id: ID!): User
    getAllUsers(q: QueryGetListInput): UserPagination
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User
    updateUser(id: ID!, data: UpdateUserInput!): User
    deleteOneUser(id: ID!): User
  }

  type User {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Email"
    email: String
    "Username"
    username: String
    "Url of avatar"
    avatarUrl: String
    "Date of birth"
    dob: String
    "FEMALE OR MALE"
    gender: String
    "Online/Offline"
    isOnline: Boolean
  }

  input CreateUserInput {
    "Email"
    email: String!
    "Username"
    username: String!
    "Url of avatar"
    avatarUrl: String
    "Date of birth"
    dob: String
    "FEMALE OR MALE"
    gender: String
    "Password"
    password: String!
    "MEMBER/ADMIN"
    role: String
  }

  input UpdateUserInput {
    "Username"
    username: String
    "Url of avatar"
    avatarUrl: String
    "Date of birth"
    dob: String
    "FEMALE OR MALE"
    gender: String
  }

  type UserPagination {
    data: [User]
    total: Int
    pagination: Pagination
  }

  type LoginData {
    user: User
    token: String
  }
`;

export default schema;
