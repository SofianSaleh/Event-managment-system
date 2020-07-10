import commentController from "../controllers/comments.controller";
import followController from "src/controllers/follow.controller";
// import chalk from "chalk";

export default {
  Query: {
    getYourFollowers: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return followController.getYourFollowers(req.user.user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },

    getYourFollowing: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await followController.getYourFollowings(req.user.user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    getFollowers: async (
      _: any,
      { user_id }: { user_id: string },
      { req }: any
    ) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return followController.getFollowers(user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },

    getFollowing: async (
      _: any,
      { user_id }: { user_id: string },
      { req }: any
    ) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await followController.getFollowings(user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
  },

  Mutation: {
    follow: async (_: any, { following_id }: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await followController.followUser(
          req.user.user_id,
          following_id
        );
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },

    unfollow: async (
      _: any,
      { following_id }: { following_id: string },
      { req }: any
    ) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await followController.unfollowUser(
          req.user.user_id,
          following_id
        );
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
  },
};
