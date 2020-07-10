import { gql } from "apollo-server-express";

export default gql`
  type Follow {
    _id: String
    follower: User!
    following: User!
  }

  type Query {
    getYourFollower FollowResponse!
    getYourFollowing: FollowResponse!
    getFollower FollowResponse!
    getFollowing: FollowResponse!
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
