/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_TYPE } from "./user.const";

export type TUser = {
  userName: string;
  password: string;
  passwordChangedAt: Date;
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
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserType = keyof typeof USER_TYPE;
