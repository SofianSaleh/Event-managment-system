import userController from "../controllers/user.Controller";
import { verifyPassword } from "../services/crypt.service";
import { UserInput } from "../interfaces/User.interface";
import { sendRefreshToken } from "../helpers/sendRefreshToken.helper";
import {
  createNormalToken,
  createRefreshToken,
} from "../services/auth.service";

export default {
  Query: {
    getUser: (_: any, id: string, { req }: any) => {
      try {
        console.log(req.userId);
        if (req.userId) return null;
        const user = userController.getUser({ id });
        if (!user) return null;
        console.log(user);
        return user;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    getUserByUsername: (_: any, username: string, { req }: any) => {
      try {
        if (req.userId) return null;
        const user = userController.getUser({ username });
        if (!user) return null;
        return user;
      } catch (e) {
        console.log(e);
        throw e;
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
      const user = await userController.getUser({ email });
      console.log(user);
      if (!user) return { success: false, token: null, refresh: null };

      const valid = verifyPassword(user.password, password);
      if (!valid) return { success: false, token: null, refresh: null };

      const accessToken = createNormalToken(user.id);
      const refreshToken = createRefreshToken(user.id, user.count);

      sendRefreshToken(res, refreshToken);

      return {
        success: true,
        token: accessToken,
        refresh: null,
      };
    },
    register: async (_: any, userInfo: UserInput) => {
      try {
        console.log(userInfo.password, "UserIndfo");
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
