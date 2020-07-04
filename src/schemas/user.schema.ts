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
    count: Int
  }

  type Query {
    getUser(id: String): getResponse
    getUserByUsername(username: String): getResponse
    getAllUsers: getResponse
  }

  type registerResponse {
    success: Boolean!
    msg: String!
    other: one
  }

  type loginResponse {
    success: Boolean!
    msg: String!
    other: two
  }

  type getResponse {
    success: Boolean!
    msg: String!
    other: one
  }
  type one {
    user: UserFetched!
  }

  type two {
    accessToken: String!
    user: UserFetched!
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
    ): registerResponse
    login(email: String!, password: String!): loginResponse
  }
`;
