import userController from "../controllers/user.Controller";
import { verifyPassword } from "../services/crypt.service";
import { UserInput } from "../interfaces/User.interface";
import { sendRefreshToken } from "../helpers/sendRefreshToken.helper";
import { responseFormatter } from "../helpers/errorHandler.helper";
import {
  createNormalToken,
  createRefreshToken,
} from "../services/auth.service";

export default {
  Query: {
    getUser: async (_: any, { id }: any, { req }: any) => {
      if (!req.user)
        return {
          succes: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      const user = await userController.getUser({ _id: id });

      if (!user) return null;

      console.log(user);
      return user;
    },
    getUserByUsername: async (_: any, username: string, { req }: any) => {
      try {
        if (!req.user)
          return {
            succes: false,
            errors: [{ path: "Token", msg: "UnAuthorized" }],
          };
        const user = await userController.getUser({ username });

        if (!user)
          return responseFormatter(
            false,
            `User with username: ${username} was not found`,
            null
          );

        return responseFormatter(
          true,
          `User with username: ${username} was found`,
          { user }
        );
      } catch (e) {
        console.log(e);
        return responseFormatter(false, e.message, null);
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

      if (!user)
        return {
          success: false,
          token: null,
          errors: [{ path: `Email`, msg: `Email doesn't exist` }],
        };

      const valid = await verifyPassword(user.password, password);
      if (!valid)
        return {
          success: false,
          token: null,
          errors: [{ path: `Password`, msg: `Password is wrong` }],
        };

      const accessToken = createNormalToken(user.id);
      const refreshToken = createRefreshToken(user.id, user.count);

      sendRefreshToken(res, refreshToken);

      return { success: true, token: accessToken, errors: null };
    },
    register: async (_: any, userInfo: UserInput) => {
      try {
        return await userController.register(userInfo);
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },

    verifyUser: async (_: any, { code }: { code: string }, { req }: any) => {
      try {
        if (!req.user)
          return {
            success: false,
            errors: [{ path: "Token", msg: "UnAuthorized" }],
          };

        return await userController.verifyUser(req.user.user_id, code);
      } catch (e) {
        console.log(e.message);
        return responseFormatter(false, e.message, null);
      }
    },
  },
};
