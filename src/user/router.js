import { Router } from "express";

const userRouter = new Router();

userRouter.post("/api/users", (req, res) => {
  console.log(req.body);
  res.send({ message: "Success" });
});

export default userRouter;
