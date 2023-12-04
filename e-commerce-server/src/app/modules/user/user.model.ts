import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  userType: {
    type: String,
    enum: ["customer", "vendor", "admin"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const User = model<TUser>("User", userSchema);
