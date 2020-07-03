import { Request, Response } from "express";
import userController from "../controllers/user.Controller";

export const invalidateRefreshToken = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.id;
    const user = await userController.incrementCount(user_id);
    res.json({ success: true, user });
  } catch (e) {
    throw e;
  }
};
