import { sign, verify } from "jsonwebtoken";

export const createNormalToken = async (id: string) => {
  try {
    const accessToken = sign(
      {
        user_id: id,
      },
      `${process.env.SECRET_1}`,
      { expiresIn: "15s" }
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

export const verifyAccessToken = (token: string) => {
  try {
    const verifiedToken = verify(token, `${process.env.SECRET_1}`);
    return verifiedToken;
  } catch (e) {
    throw e;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const verifiedToken = verify(token, `${process.env.SECRET_2}`);
    return verifiedToken;
  } catch (e) {
    throw e;
  }
};
