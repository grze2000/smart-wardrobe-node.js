import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { clothesSchema, IClothes } from "./Clothes.js";
import { deviceTokenSchema, IDeviceToken } from "./DeviceToken.js";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  clothes: IClothes[];
  deviceTokens: IDeviceToken[];
}

export interface IUserMethods {
  comparePassword: (
    password: string,
    cb: (error: Error | null, isMath?: boolean) => void
  ) => void;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

export const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  clothes: [clothesSchema],
  deviceTokens: [deviceTokenSchema],
});

userSchema.pre("save", function (next) {
  if (!this.isNew) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

userSchema.method(
  "comparePassword",
  function (
    password: string,
    cb: (error: Error | null, isMath?: boolean) => void
  ) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
);

export default mongoose.model<IUser, UserModel>("User", userSchema, "users");
