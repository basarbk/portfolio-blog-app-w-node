import { checkSchema } from "express-validator";

export const reactionSchema = checkSchema({
  entityType: {
    isIn: {
      options: [["article"]],
      errorMessage: "Invalid entity type",
    },
  },
  entityId: {
    isInt: {
      options: {
        gt: 0,
      },
      errorMessage: "Invalid entity id",
    },
  },
  category: {
    isIn: {
      options: [["like", "readingList", "hot"]],
      errorMessage: "Invalid category",
    },
  },
});
