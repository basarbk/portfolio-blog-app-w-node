import { Router } from "express";
import { save } from "./service.js";
import { userPostSchema } from "./validation/schema.js";
import schemaValidator from "../shared/middleware/schemaValidator.js";

const userRouter = new Router();

userRouter.post(
  "/api/users",
  schemaValidator(userPostSchema),
  async (req, res, _next) => {
    await save(req.body);
    res.send({ message: "Success" });
  },
);

export default userRouter;
