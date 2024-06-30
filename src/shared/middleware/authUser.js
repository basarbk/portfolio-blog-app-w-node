import { getUserFromToken } from "../../auth/service.js";

export default async function (req, res, next) {
  const token = req.cookies["app-token"];
  if (!token) return next();
  const user = await getUserFromToken(token);
  req["user"] = user;
  next();
}
