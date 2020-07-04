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
      try {
        if (!req.user)
          return responseFormatter(false, "Token is invalid", null);

        const user = await userController.getUser({ _id: id });

        if (!user)
          return responseFormatter(
            false,
            `User with id: ${id} was not found`,
            null
          );
        console.log(user);
        return responseFormatter(true, `User with id: ${id} was found`, {
          user,
        });
      } catch (e) {
        console.log(e);
        return responseFormatter(false, e.message, null);
      }
    },
    getUserByUsername: async (_: any, username: string, { req }: any) => {
      try {
        if (!req.user)
          return responseFormatter(false, "Token is invalid", null);
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
        return responseFormatter(
          true,
          `User with email: ${email} was found`,
          null
        );

      const valid = verifyPassword(user.password, password);
      if (!valid) return responseFormatter(true, `Password is incorrect`, null);

      const accessToken = createNormalToken(user.id);
      const refreshToken = createRefreshToken(user.id, user.count);

      sendRefreshToken(res, refreshToken);

      return responseFormatter(true, `Login successful`, { accessToken, user });
    },
    register: async (_: any, userInfo: UserInput) => {
      try {
        return await userController.register(userInfo);
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },

    verifyUser: async (_: any, code: string, { req }: any) => {
      try {
        if (!req.user)
          return responseFormatter(false, "Token is invalid", null);

        const user = await userController.verifyUser(req.user.user_id, code);

        return user;
      } catch (e) {
        console.log(e.message);
        return responseFormatter(false, e.message, null);
      }
    },
  },
};
