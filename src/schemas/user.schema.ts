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
    count: Int!
  }
  

  type Query {
    getUser(id: String): 
    getUserByUsername(username: String): 
    getAllUsers: 
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
  }
`;
