import { Router } from "express";
import { save } from "./service.js";
import { body, validationResult } from "express-validator";
import ValidationException from "../error/ValidationException.js";

const userRouter = new Router();

userRouter.post(
  "/api/users",
  body("email").isEmail().withMessage("Invalid email"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors.array().forEach((error) => {
        validationErrors[error.path] = error.msg;
      });
      return next(new ValidationException(validationErrors));
    }
    await save(req.body);
    res.send({ message: "Success" });
  },
);

export default userRouter;
