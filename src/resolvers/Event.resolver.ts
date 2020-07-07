import eventController from "../controllers/event.controller";
// import chalk from "chalk";

export default {
  Query: {
    getEvent: async (_: any, { id }: { id: string }, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await eventController.getEvent(id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolver", msg: `${e.message}` }],
        };
      }
    },
    searchEvent: async (_: any, { searchTerm }: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await eventController.searchEvent(searchTerm);
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
        return await eventController.getAllEvents();
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
        return await eventController.createEvent(eventInfo, req.user.user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
    updateEvent: async (_: any, { id, updateObj }: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        // return { success: false };
        return await eventController.updateEvent(id, updateObj);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
    deleteEvent: async (_: any, { eventId }: any, { req }: any) => {
      if (!req.user)
        return {
          success: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        return await eventController.deleteEvent(eventId, req.user.user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Event Resolvers", msg: `${e.message}` }],
        };
      }
    },
    addComment: async (_: any, { eventId, comment }: any, { req }: any) => {
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
