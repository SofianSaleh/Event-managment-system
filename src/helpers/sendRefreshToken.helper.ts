import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(`refresh-token`, token, { httpOnly: true });
};
