import { CustomValidator, Schema } from "express-validator";

const notMatchingPasswordValidator: CustomValidator = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Podane hasła nie są identyczne");
  }
  return true;
};

export const registerSchema: Schema = {
  username: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Enter your username",
    },
    isAlphanumeric: {
      errorMessage: "Username can contain only letters and numbers",
      options: ["pl-PL"],
    },
  },
  email: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Enter your email",
    },
    isEmail: {
      errorMessage: "Enter a valid email",
    },
  },
  password: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Enter password",
    },
    isLength: {
      options: { min: 8, max: 32 },
      errorMessage: "Password must have 8 to 32 characters",
    },
  },
  confirmPassword: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Confirm password",
    },
    custom: {
      options: notMatchingPasswordValidator,
    },
  },
};
