import { Router } from "express";
import { articleSchema } from "./validation/schema.js";
import schemaValidator from "../shared/middleware/schemaValidator.js";
import { save } from "./service.js";
import authUser from "../shared/middleware/authUser.js";
const articleRouter = new Router();

articleRouter.post(
  "/api/articles",
  authUser,
  schemaValidator(articleSchema),
  async (req, res, next) => {
    try {
      const article = await save(req.body, req.user);
      res.status(201).send(article);
    } catch (err) {
      next(err);
    }
  },
);

export default articleRouter;
