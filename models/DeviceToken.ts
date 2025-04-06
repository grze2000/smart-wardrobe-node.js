import mongoose, { Document, Schema } from "mongoose";

export interface IDeviceToken extends Document {
  token: string;
  name?: string | null;
}

export const deviceTokenSchema = new Schema<IDeviceToken>(
  {
    token: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDeviceToken>(
  "DeviceToken",
  deviceTokenSchema,
  "deviceTokens"
);
