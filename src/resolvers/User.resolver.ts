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
      try {
        const user = await userController.getUser({ _id: id });

        if (!user)
          return {
            success: false,
            errors: [
              {
                path: "Get User",
                msg: `Couldn't find a user with the id: ${id}`,
              },
            ],
          };

        console.log(user);
        return { success: true, user };
      } catch (e) {
        console.log(e.message);
        return {
          success: false,
          errors: [{ path: "Get User", msg: `${e.message}` }],
        };
      }
    },

    getUserByUsername: async (_: any, username: string, { req }: any) => {
      if (!req.user)
        return {
          succes: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };
      try {
        const user = await userController.getUser({ username });

        if (!user)
          return {
            success: false,
            errors: [
              {
                path: "Get User",
                msg: `Couldn't find a user with the username: ${username}`,
              },
            ],
          };

        return { success: true, user };
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Get User", msg: `${e.message}` }],
        };
      }
    },

    getAllUsers: async (_: any, __: any, { req }: any) => {
      if (!req.user)
        return {
          succes: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        const users = await userController.getAll();

        if (users.length === 0)
          return {
            success: false,
            errors: [{ path: "Get all users", msg: `No users are available` }],
          };

        return {
          success: true,
          users,
        };
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Get User", msg: `${e.message}` }],
        };
      }
    },
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

    updateUser: async (_: any, { updateObj }: any, { req }: any) => {
      if (!req.user)
        return {
          succes: false,
          errors: [{ path: "Token", msg: "UnAuthorized" }],
        };

      try {
        if (Object.values(updateObj).includes(null))
          return {
            success: false,
            errors: [{ path: `Update User`, msg: `Nothing was updated` }],
          };
        return await userController.updateUser(updateObj, req.user.user_id);
      } catch (e) {
        return {
          success: false,
          errors: [{ path: "Get User", msg: `${e.message}` }],
        };
      }
    },
  },
};
