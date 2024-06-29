import { checkSchema } from "express-validator";

export const authSchema = checkSchema({
  token: {
    notEmpty: true,
  },
  operation: {
    isIn: {
      options: [["register", "login"]],
      errorMessage: "Invalid operation",
    },
  },
});

export const loginSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
});
