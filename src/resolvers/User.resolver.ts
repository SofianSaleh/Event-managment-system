import userController from "../controllers/user.Controller";

export default {
  Query: {
    getUser: async (id: string) => {
      try {
        return userController.getUser(id);
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
