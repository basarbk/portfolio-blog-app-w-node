import { Router } from "express";
import schemaValidator from "../shared/middleware/schemaValidator.js";
import authUser from "../shared/middleware/authUser.js";
import { reactionSchema } from "./validation/schema.js";
import { toggleReaction } from "./service.js";

const reactionRouter = new Router();

reactionRouter.post(
  "/api/reactions",
  schemaValidator(reactionSchema),
  authUser({ required: true }),
  async (req, res, next) => {
    try {
      const result = await toggleReaction(req.body, req.user);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },
);

export default reactionRouter;
