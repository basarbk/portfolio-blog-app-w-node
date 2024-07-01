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

export const userUpdateSchema = checkSchema({
  name: {
    isLength: {
      options: {
        min: 3,
        max: 128,
      },
      errorMessage: "Name must be min 3, max 128 characters",
    },
  },
});
