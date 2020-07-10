import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    _id: String
    comment: String!
    user: User!
  }

  type Query {
    getComment(comment_id: String!): QueryResponse!
    getComments(eventId: String!): QueryResponse!
  }

  type Mutation {
    addComment(eventId: String, comment: String!): MutationResponse!
    removeComment(comment_id: String!, event_id: String!): MutationResponse!
  }
`;
