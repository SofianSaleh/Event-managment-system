export default `
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
        getUser(Id: String): UserFetched!
        getAllUsers: [UserFetched!]!
    }

    type registerResponse {
        success: Boolean!
        user: User
        
    }
    
    type loginResponse {
        success: Boolean!
        token: String
        refreshToken: String
        
    }

    type UserInput {
        firstName: String
        lastName: String
        username: String!
        email: String!
        password: String!
        gender: String
        code: String
    }

    type Mutation {
        register(userInfo: UserInput): registerResponse!
        login(email: String!, password: String!): loginResponse!
    }

`;
