import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
    events: [Event]
    code: String
    is_verified: Boolean
    count: Int!
  }

  type Query {
    getUser(id: String): registerResponse!
    getUserByUsername(username: String): registerResponse!
    getAllUsers: allUsersResponse!
  }

  type allUsersResponse {
    success: Boolean!
    users: [User!]
    errors: [Error!]
  }

  type registerResponse {
    success: Boolean!
    user: User
    errors: [Error!]
  }

  type loginResponse {
    success: Boolean!
    token: String
    errors: [Error!]
  }

  input updateObject {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
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
    ): registerResponse!

    login(email: String!, password: String!): loginResponse!

    verifyUser(code: String!): registerResponse!

    updateUser(updateObj: updateObject!): registerResponse!
  }
`;
