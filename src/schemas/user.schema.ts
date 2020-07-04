import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
    code: String
    is_verified: Boolean
  }
  type UserFetched {
    id: String
    firstName: String!
    lastName: String!
    username: String
    email: String
    is_verified: Boolean
  }

  type Query {
    hello: String!
    getUser(id: String): response
    getUserByUsername(username: String): response
    getAllUsers: [UserFetched]
  }

  type response {
    success: Boolean!
    msg: String!
    other: String
  }

  type Mutation {
    register(
      firstName: String
      lastName: String
      username: String!
      email: String!
      password: String!
      gender: String
      code: String
    ): response
    login(email: String!, password: String!): response
  }
`;
