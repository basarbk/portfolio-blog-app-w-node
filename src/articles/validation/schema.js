import { checkSchema } from "express-validator";

export const articleSchema = checkSchema({
  title: {
    isLength: {
      options: {
        min: 3,
        max: 128,
      },
      errorMessage: "Title must have min 3 and max 128 characters",
    },
  },
  content: {
    isLength: {
      options: {
        min: 10,
        max: 65536,
      },
      errorMessage: "Content must have min 10 and max 65536 characters",
    },
  },
});
