import { Schema } from "express-validator";

export const deviceTokenSchema: Schema = {
  name: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isAlphanumeric: {
      errorMessage: "Name can contain only letters and numbers",
      options: ["pl-PL"],
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "Name cannot be longer than 20 characters",
    },
  },
};
