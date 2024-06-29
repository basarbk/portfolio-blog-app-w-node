import { Router } from "express";
import { handleAuth } from "./service.js";

const authRouter = new Router();

const ONE_YEAR_IN_MILLIS = 365 * 24 * 60 * 60 * 1000;

authRouter.post("/api/auth", async (req, res, next) => {
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
});

export default authRouter;
