import { sign, verify } from "jsonwebtoken";
import userController from "../controllers/user.Controller";

export const createNormalToken = async (user: any) => {
  try {
    const accessToken = sign(
      {
        user_id: user.id,
      },
      `${process.env.SECRET_1}`,
      { expiresIn: "1m" }
    );
  } catch (e) {
    throw e;
  }
};
