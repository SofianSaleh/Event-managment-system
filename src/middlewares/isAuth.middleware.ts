import {
  verifyAccessToken,
  verifyRefreshToken,
  createRefreshToken,
} from "../services/auth.service";
import { createNormalToken } from "../services/auth.service";
import userController from "../controllers/user.Controller";
import { sendRefreshToken } from "../helpers/sendRefreshToken.helper";

export const isAuth = (req: any, _res: any, next: any) => {
  const authorization = req.headers["authorization"];
  if (!authorization) return next();
  try {
    const token = authorization.split(" ")[1];
    const data = verifyAccessToken(token);
    req.user = data;
    return next();
  } catch (e) {
    return next();
  }
};

/**
 *
 * @param req gets the request object specificly the cookie
 * @param res to return the new token
 * * It checks if there is a cookie
 * * Then it verifies the token
 * * Lastly it feches the user and creates a new token
 * ! Errors need to be handled
 */
export const refreshToken = async (req: any, res: any) => {
  let token = req.cookies["refresh-token"];
  if (!token) return res.json({ success: false });

  let payload: any;
  try {
    payload = verifyRefreshToken(token);
  } catch (e) {
    console.log(e.message);
    return res.json({ success: false, msg: 2 });
  }

  const user = await userController.getUser({ id: payload.userId });
  console.log(user);
  if (!user) return res.json({ success: false, msg: "no UsEr WaS fOuNd" });

  if (user.count !== payload.count)
    return res.json({ success: false, msg: `Token is invalid` });

  const refreshToken = createRefreshToken(user.id, user.count);

  sendRefreshToken(res, refreshToken);

  return res.send({ success: true, access: createNormalToken(user.id) });
};
