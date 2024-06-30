import { getUserFromToken } from "../../auth/service.js";
import ForbiddenException from "../../error/ForbiddenException.js";

export default function ({ required } = { required: false }) {
  return async function (req, res, next) {
    const token = req.cookies["app-token"];
    if (token) {
      const user = await getUserFromToken(token);
      if (user) {
        req["user"] = user;
        return next();
      }
    }
    if (required) {
      return next(new ForbiddenException());
    }
    next();
  };
}
