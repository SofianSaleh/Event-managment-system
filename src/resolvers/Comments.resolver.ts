import commentController from "../controllers/comments.controller";
// import chalk from "chalk";

export default {
  Query: {
    getComment: async (_: any, {}: { id: string }, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return null;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    getComments: async (_: any, {}: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return null;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
  },

  Mutation: {
    addComment: async (_: any, { eventId, comment }: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await commentController.addComment(
          eventId,
          comment,
          req.user.user_id
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
