import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/sendEmail";
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
    userId: user._id,
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

const verifyEmail = async (token: string) => {
  // verify the token
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  const { email, role } = decoded as JwtPayload;
  // check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // check if the user is already verified
  if (user.isVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is already verified");
  }

  // update the user
  await User.findOneAndUpdate({ email, role }, { isVerified: true });
  return null;
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

  const resetUrlLink = `${config.client_url}/auth/reset-password?email=${user?.email}&token=${resetToken}`;
  sendEmail(
    resetUrlLink,
    user.email,
    "Reset your password within 10 minutes!",
    "Reset Password",
    "Reset your password within 10 minutes! Click the link below to reset your password:",
  );
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const { email, newPassword } = payload;
  // check if the user exists in the database
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // verify the token
  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (decoded.email !== email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not authorized to reset the password",
    );
  }

  // hashing the new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt),
  );

  // updating the password
  await User.findOneAndUpdate(
    { email: decoded.email, userType: decoded.userType },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );
  return null;
};

export const AuthServices = {
  loginUser,
  verifyEmail,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
