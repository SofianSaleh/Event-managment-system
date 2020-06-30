import userController from "../controllers/user.Controller";

export default {
  Query: {
    getUser: function async() {
      try {
        console.log(`hi`);
        console.log(arguments);
        return userController.getUser(`213423412`);
      } catch (e) {
        console.log(e);
      }
    },
    getAllUsers: async () => {},
  },
  Mutation: {
    login: async () => {},
    register: async () => {},
  },
};
