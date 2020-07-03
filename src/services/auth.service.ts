import { sign, verify } from "jsonwebtoken";
import userController from "../controllers/user.Controller";

export const createNormalToken = async (id: string) => {
  try {
    const accessToken = sign(
      {
        user_id: id,
      },
      `${process.env.SECRET_1}`,
      { expiresIn: "15m" }
    );
    return accessToken;
  } catch (e) {
    throw e;
  }
};

export const createRefreshToken = async (id: string, count: number) => {
  try {
    const refreshToken = sign(
      {
        user_id: id,
        count,
      },
      `${process.env.SECRET_2}`,
      { expiresIn: "7d" }
    );
    return refreshToken;
  } catch (e) {
    throw e;
  }
};
