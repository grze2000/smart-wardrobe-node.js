import mongoose, { Document, Schema } from "mongoose";

export interface IRefreshToken extends Document {
  token: string;
  expireAt: Date;
}

export const refreshTokenSchema = new Schema<IRefreshToken>({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema,
  "refreshTokens"
);
