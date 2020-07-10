import { gql } from "apollo-server-express";

export default gql`
  type Follow {
    _id: String
    follower: User!
    following: User!
  }

  type Query {
    getFollower(comment_id: String!): QueryResponse!
    getFollowing(eventId: String!): QueryResponse!
  }

  type FollowQueryResponse {
    success: Boolean!
  }

  type Mutation {
    follow(eventId: String, comment: String!): MutationResponse!
    unfollow(comment_id: String!, event_id: String!): MutationResponse!
  }
`;
