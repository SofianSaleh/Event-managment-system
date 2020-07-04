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
    getUser: (_: any, id: string, { req }: any) => {
      try {
        console.log(req.userId);
        if (req.userId)
          return responseFormatter(false, "Token is invalid", null);
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
        if (req.userId)
          return responseFormatter(false, "Token is invalid", null);
        const user = userController.getUser({ username });

        if (!user)
          return responseFormatter(
            false,
            `User with username: ${username} was found`,
            null
          );

        return responseFormatter(
          true,
          `User with username: ${username} was found`,
          user
        );
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

      if (!user)
        return responseFormatter(
          true,
          `User with email: ${email} was found`,
          user
        );

      const valid = verifyPassword(user.password, password);
      if (!valid) return responseFormatter(true, `Password is incorrect`, user);

      const accessToken = createNormalToken(user.id);
      const refreshToken = createRefreshToken(user.id, user.count);

      sendRefreshToken(res, refreshToken);

      return responseFormatter(true, `Login successful`, accessToken);
    },
    register: async (_: any, userInfo: UserInput) => {
      try {
        const newUser = userController.register(userInfo);
        if (!newUser)
          return responseFormatter(true, `User register unsuccessfull`, null);
        return responseFormatter(true, `User registered successfully`, newUser);
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
  },
};
