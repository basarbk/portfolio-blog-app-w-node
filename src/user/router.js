import { Router } from "express";
import { save } from "./service.js";
import { body, validationResult } from "express-validator";

const userRouter = new Router();

userRouter.post(
  "/api/users",
  body("email").isEmail().withMessage("Invalid email"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors.array().forEach((error) => {
        validationErrors[error.path] = error.msg;
      });
      return res.status(400).send({ validationErrors });
    }
    await save(req.body);
    res.send({ message: "Success" });
  },
);

export default userRouter;
