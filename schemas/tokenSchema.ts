import { Schema } from "express-validator";

export const tokenSchema: Schema = {
  token: {
    in: ["body"],
    isEmpty: {
      negated: true,
    },
    errorMessage: "Token not found",
  },
};
