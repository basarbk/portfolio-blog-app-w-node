import { Router } from "express";
import { articleSchema } from "./validation/schema.js";
import schemaValidator from "../shared/middleware/schemaValidator.js";
import { publish, save, update } from "./service.js";
import authUser from "../shared/middleware/authUser.js";
const articleRouter = new Router();

articleRouter.post(
  "/api/articles",
  authUser({ required: true }),
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

articleRouter.put(
  "/api/articles/:id",
  authUser({ required: true }),
  schemaValidator(articleSchema),
  async (req, res, next) => {
    try {
      const article = await update(req.params.id, req.body, req.user);
      res.send(article);
    } catch (err) {
      next(err);
    }
  },
);

articleRouter.patch(
  "/api/articles/:id/publish",
  authUser({ required: true }),
  async (req, res, next) => {
    try {
      const result = await publish(req.params.id, req.user);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },
);

export default articleRouter;
