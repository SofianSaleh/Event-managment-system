import userController from "../controllers/user.Controller";
import { verifyPassword } from "../services/crypt.service";

export default {
  Query: {
    hello: async (_: any, __: any, { req }: any) => {
      console.log(`hi`);
      console.log(req.body);
      return "world";
    },
    getUser: function async(_: any, __: any, { req }: any) {
      try {
        console.log(req.body);
        console.log(`hi`);
        console.log(arguments);
        return `213423412`;
      } catch (e) {
        console.log(e);
      }
    },
    getAllUsers: async () => {},
  },
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await userController.getUser({ email: email });
      if (!user) return null;

      const valid = verifyPassword(user.password, password);
      if (!valid) return null;
    },
    register: async () => {},
  },
};
