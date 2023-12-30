import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // Checking if the user exists in the database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //   Check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // Checking if the password matches
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password does not match");
  }

  const jwtPayload = {
    email: user.email,
    userType: user.userType,
  };

  //   Create a JWT access token and send it to the client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  //  Create a JWT refresh token and send it to the client
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Checking if the user exists in the database
  const user = await User.findOne({ email: userData.email }).select(
    "+password",
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // Checking if the password matches
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password does not match");
  }

  // hashing the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  // updating the password

  await User.findOneAndUpdate(
    { email: userData.email, userType: userData.userType },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // verify the token
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded as JwtPayload;
  // check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // check if the password is changed after the token is issued
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Password is changed after the token is issued",
    );
  }

  // create a new JWT access token and send it to the client
  const jwtPayload = {
    email: user.email,
    userType: user.userType,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

const forgetPassword = async (email: string) => {
  // check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  const jwtPayload = {
    email: user.email,
    userType: user.userType,
  };

  // create a reset token
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m",
  );

  const resetUrlLink = `${config.reset_password_url_link}?email=${user?.email}&token=${resetToken}`;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
