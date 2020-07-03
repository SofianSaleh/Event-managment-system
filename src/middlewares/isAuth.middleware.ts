import { verifyAccessToken } from "../services/auth.service";
export const isAuth = (req: any, _res: any, _next: any) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error(`No authorization`);
  try {
    const token = authorization.split(" ")[1];
    const data = verifyAccessToken(token);
    req.user = data;
  } catch (e) {
    throw e;
  }
};
