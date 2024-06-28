import { checkSchema } from "express-validator";
import uniqueEmail from "./uniqueEmail.js";

export const userPostSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email",
      bail: true,
    },
    custom: {
      options: uniqueEmail,
    },
  },
});
