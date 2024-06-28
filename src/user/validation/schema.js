import { checkSchema } from "express-validator";

export const userPostSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
});
