import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser>(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: String,
    userType: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const user = this;
  const userId = user._id;
  const isUserExist = await User.findOne({ _id: userId });
  if (isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User already exist");
  }
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));

  next();
});

export const User = model<TUser>("User", userSchema);
