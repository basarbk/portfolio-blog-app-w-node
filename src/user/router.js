import { Router } from "express";
import { getUser, save, updateUser } from "./service.js";
import { userPostSchema, userUpdateSchema } from "./validation/schema.js";
import schemaValidator from "../shared/middleware/schemaValidator.js";
import authUser from "../shared/middleware/authUser.js";
import ForbiddenException from "../error/ForbiddenException.js";

const userRouter = new Router();

userRouter.post(
  "/api/users",
  schemaValidator(userPostSchema),
  async (req, res, next) => {
    try {
      await save(req.body);
      res.send({ message: "Please check your email" });
    } catch (err) {
      next(err);
    }
  },
);

userRouter.put(
  "/api/users/:id",
  authUser({ required: true }),
  schemaValidator(userUpdateSchema),
  async (req, res, next) => {
    if (+req.params.id !== req.user.id) {
      return next(new ForbiddenException());
    }
    try {
      await updateUser(+req.params.id, req.body);
      res.send({ message: "User is updated" });
    } catch (err) {
      next(err);
    }
  },
);

userRouter.get("/api/users/:handle", async (req, res, next) => {
  try {
    const user = await getUser(req.params.handle);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
