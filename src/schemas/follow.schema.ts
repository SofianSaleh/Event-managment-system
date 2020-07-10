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
    users: [Follow!]
    errors: [Error!]
  }
  type FollowMutationResponse {
    success: Boolean!
    user: Follow!
    errors: [Error!]
  }

  type Mutation {
    follow(following_id: String): FollowMutationResponse!
    unfollow(following_id: String!): FollowMutationResponse!
  }
`;
