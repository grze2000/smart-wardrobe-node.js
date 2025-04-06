import { Schema } from "express-validator";

export const weatherLogSchema: Schema = {
  "externalData.temperature": {
    in: ["body"],
    exists: {
      options: { checkNull: true, checkFalsy: true },
      errorMessage: "externalData.temperature is required",
    },
    isFloat: {
      errorMessage: "externalData.temperature must be a float number",
    },
  },
  "internalData.temperature": {
    in: ["body"],
    exists: {
      options: { checkNull: true, checkFalsy: true },
      errorMessage: "internalData.temperature is required",
    },
    isFloat: {
      errorMessage: "internalData.temperature must be a float number",
    },
  },
  "internalData.humidity": {
    in: ["body"],
    exists: {
      options: { checkNull: true, checkFalsy: true },
      errorMessage: "internalData.humidity is required",
    },
    isFloat: {
      errorMessage: "internalData.humidity must be a float number",
    },
  },
  "location.lat": {
    in: ["body"],
    exists: {
      options: { checkNull: true, checkFalsy: true },
      errorMessage: "location.lat is required",
    },
    isFloat: {
      errorMessage: "location.lat must be a float number",
    },
  },
  "location.lng": {
    in: ["body"],
    exists: {
      options: { checkNull: true, checkFalsy: true },
      errorMessage: "location.lng is required",
    },
    isFloat: {
      errorMessage: "location.lng must be a float number",
    },
  },
};
