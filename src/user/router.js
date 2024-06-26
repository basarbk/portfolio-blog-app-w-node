import { Router } from "express";
import { save } from "./service.js";

const userRouter = new Router();

userRouter.post("/api/users", async (req, res) => {
  await save(req.body);
  res.send({ message: "Success" });
});

export default userRouter;
