import { Router } from "express";
import { articleSchema } from "./validation/schema.js";
import schemaValidator from "../shared/middleware/schemaValidator.js";
import { save } from "./service.js";
const articleRouter = new Router();

articleRouter.post(
  "/api/articles",
  schemaValidator(articleSchema),
  async (req, res, next) => {
    try {
      const article = await save(req.body);
      res.status(201).send(article);
    } catch (err) {
      next(err);
    }
  },
);

export default articleRouter;
