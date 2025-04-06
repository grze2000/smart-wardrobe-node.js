import { CustomValidator, Schema } from "express-validator";
import { CLOTHES_STATUSES } from "../enums/clothesStatuses";
import { CLOTHES_TYPES } from "../enums/clothesTypes";
import { COLORS } from "../enums/colors";
import { MATERIAL_THICKNESS } from "../enums/materialThickness";

const colorsValidator: CustomValidator = (value) => {
  return (
    Array.isArray(value) &&
    value.every((x) => Object.values(COLORS).includes(x))
  );
};

const statusesValidator: CustomValidator = (value) => {
  return (
    Array.isArray(value) &&
    value.every((x) => Object.values(CLOTHES_STATUSES).includes(x))
  );
};

export const clothesSchema: Schema = {
  name: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Enter clothes name",
    },
    isAlphanumeric: {
      errorMessage: "Name can contain only letters and numbers",
      options: ["pl-PL", { ignore: "- " }],
    },
  },
  description: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isAlphanumeric: {
      errorMessage: "Name can contain only letters and numbers",
      options: ["pl-PL"],
    },
  },
  type: {
    in: ["body"],
    isIn: {
      options: [Object.values(CLOTHES_TYPES)],
      errorMessage: "Incorrect clothes type",
    },
    isEmpty: {
      negated: true,
      errorMessage: "Missing clothes type",
    },
  },
  materialThickness: {
    in: ["body"],
    isIn: {
      options: [Object.values(MATERIAL_THICKNESS)],
      errorMessage: "Incorrect material thickness",
    },
    isEmpty: {
      negated: true,
      errorMessage: "Missing material thickness",
    },
  },
  colors: {
    in: ["body"],
    optional: { options: { nullable: true } },
    custom: {
      options: colorsValidator,
      errorMessage: "Incorrect color",
    },
  },
  status: {
    in: ["body"],
    custom: {
      options: statusesValidator,
      errorMessage: "Incorrect status",
    },
  },
  purchaseDate: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isISO8601: {
      errorMessage: "Incorrect purchase date",
    },
  },
  value: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isFloat: {
      options: [{ min: 0 }],
    },
  },
  tagId: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isString: {},
  },
};
