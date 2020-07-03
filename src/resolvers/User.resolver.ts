import userController from "../controllers/user.Controller";
import { verifyPassword } from "../services/crypt.service";
import { UserInput } from "../interfaces/User.interface";
import {
  createNormalToken,
  createRefreshToken,
} from "../services/auth.service";

export default {
  Query: {
    getUser: function async(_: any, id: string, { req }: any) {
      try {
        if (req.userId) return null;
        const user = userController.getUser({ id });
        if (!user) return null;
        return user;
      } catch (e) {
        console.log(e);
      }
    },
    getUserByUsername: function async(_: any, username: string, { req }: any) {
      try {
        if (req.userId) return null;
        const user = userController.getUser({ username });
        if (!user) return null;
        return user;
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
      console.log(user);
      if (!user) return { success: false, token: null, refresh: null };

      const valid = verifyPassword(user.password, password);
      if (!valid) return { success: false, token: null, refresh: null };

      const accessToken = await createNormalToken(user.id);
      const refreshToken = await createRefreshToken(user.id, user.count);
      console.log(accessToken, refreshToken);
      res.cookie(`refresh-token`, refreshToken);
      res.cookie(`access-token`, accessToken);
      return {
        success: true,
        token: null,
        refresh: null,
      };
    },
    register: async (_: any, userInfo: UserInput) => {
      try {
        console.log(userInfo.password, "UserIndfo");
        const newUser = userController.register(userInfo.password);
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
