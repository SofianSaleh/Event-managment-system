import { gql } from "apollo-server-express";

export default gql`
  type Follow {
    _id: String
    follower: User!
    following: User!
  }

  type Query {
    getFollower(comment_id: String!): FollowResponse!
    getFollowing(eventId: String!): FollowResponse!
  }

  type FollowResponse {
    success: Boolean!
    users: [User!]
    errors: [Error!]
  }

  type Mutation {
    follow(following_id: String): FollowResponse!
    unfollow(following_id: String!): FollowResponse!
  }
`;
