import mongoose, { Document, Schema } from "mongoose";
import { CLOTHES_TYPES } from "../enums/clothesTypes";
import { MATERIAL_THICKNESS } from "../enums/materialThickness";
import { COLORS } from "../enums/colors";
import { CLOTHES_STATUSES } from "../enums/clothesStatuses";

export interface IClothes extends Document {
  _id?: string;
  name: string;
  description?: string;
  type: typeof CLOTHES_TYPES;
  materialThickness: typeof MATERIAL_THICKNESS;
  colors?: (typeof COLORS)[];
  status?: (typeof CLOTHES_STATUSES)[];
  purchaseDate?: Date;
  value?: number;
  tagId?: string;
}

export const clothesSchema = new Schema<IClothes>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      required: true,
      enum: Object.values(CLOTHES_TYPES),
    },
    materialThickness: {
      type: String,
      required: true,
      enum: Object.values(MATERIAL_THICKNESS),
    },
    colors: [
      {
        type: String,
        enum: Object.values(COLORS),
      },
    ],
    status: {
      type: String,
      enum: Object.values(CLOTHES_STATUSES),
    },
    purchaseDate: Date,
    value: {
      type: Number,
      min: 0,
    },
    tagId: String,
  },
  { timestamps: true }
);

export default mongoose.model<IClothes>("Clothes", clothesSchema, "clothes");
