import { Router } from "express";
import { handleAuth, handleLogin, logout } from "./service.js";
import schemaValidator from "../shared/middleware/schemaValidator.js";
import { authSchema, loginSchema } from "./validation/schema.js";
import { ONE_YEAR_IN_MILLIS } from "../shared/constant.js";

const authRouter = new Router();

authRouter.post(
  "/api/auth",
  schemaValidator(authSchema),
  async (req, res, next) => {
    try {
      const { token, user } = await handleAuth(req.body);
      res.cookie("app-token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_YEAR_IN_MILLIS),
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post("/api/auth/logout", async (req, res) => {
  await logout(req.cookies["app-token"]);
  res.clearCookie("app-token");
  res.send({});
});

authRouter.post(
  "/api/auth/login",
  schemaValidator(loginSchema),
  async (req, res, next) => {
    try {
      await handleLogin(req.body);
      res.send({ message: "Please check your email" });
    } catch (err) {
      next(err);
    }
  },
);

export default authRouter;
