/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_TYPE } from "./user.const";

export type TUser = {
  userName: string;
  password: string;
  email: string;
  userType: "customer" | "vendor" | "admin";
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<boolean>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserType = keyof typeof USER_TYPE;
