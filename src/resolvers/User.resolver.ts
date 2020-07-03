import userController from "../controllers/user.Controller";
import { verifyPassword } from "../services/crypt.service";
import { UserInput } from "../interfaces/User.interface";
import {
  createNormalToken,
  createRefreshToken,
} from "../services/auth.service";

export default {
  Query: {
    hello: async (_: any, id: string, { req }: any) => {
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
      { email, password }: { email: string; password: string },
      { res }: any
    ) => {
      const user = await userController.getUser({ email: email });
      if (!user) return { success: false, token: null, refresh: null };

      const valid = verifyPassword(user.password, password);
      if (!valid) return null;

      const accessToken = createNormalToken(user.id);
      const refreshToken = createRefreshToken(user.id, user.count);

      res.cookie(`refresh-token`, refreshToken, { expires: 60 * 60 * 24 * 7 });
      res.cookie(`access-token`, accessToken, { expires: 60 * 15 });
    },
    register: async (_: any, userInfo: UserInput) => {
      try {
        const newUser = userController.register(userInfo);
        return {
          success: true,
          user: newUser,
        };
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
  },
};
