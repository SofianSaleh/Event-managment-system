import eventController from "src/controllers/event.controller";

export default {
  Query: {
    getEventById: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return req.body;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    getEventByTitle: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return req.body;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    getAllEvents: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return req.body;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    getEventsBasedOnAUser: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return req.body;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    getEventsInAnArea: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return req.body;
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
  },

  Mutation: {
    createEvent: async (_: any, eventInfo: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await eventController.createEvent(eventInfo, req.user.userId);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
    updateEvent: async (_: any, __: any, { req }: any) => {
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
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
    deleteEvent: async (_: any, __: any, { req }: any) => {
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
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
    addComment: async (_: any, __: any, { req }: any) => {
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
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
  },
};
