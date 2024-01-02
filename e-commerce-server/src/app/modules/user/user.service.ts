/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCustomer } from "../customer/customer.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Customer } from "../customer/customer.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TVendor } from "../vendor/vendor.interface";
import { Vendor } from "../vendor/vendor.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import config from "../../config";
import { verifyToken } from "../Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

// create customer without image file upload
/*
const createCustomer = async (password: string, payload: TCustomer) => {
  const userData: Partial<TUser> = {};
  userData.userName = payload.userName;
  userData.password = password;
  userData.email = payload.email;
  userData.userType = "customer";

  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Create User
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    payload.user = newUser[0]._id;

    // Transaction 2: Create Customer
    const newCustomer = await Customer.create([payload], { session });
    if (!newCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newCustomer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};
 */

// create customer with image file upload
const createCustomer = async (
  file: any,
  password: string,
  payload: TCustomer,
) => {
  const userData: Partial<TUser> = {};
  userData.userName = payload.userName;
  userData.password = password;
  userData.email = payload.email;
  userData.userType = "customer";

  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Create User
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    payload.user = newUser[0]._id;

    // Transaction 2: Create Customer
    const { secure_url } = (await sendImageToCloudinary(
      payload.userName,
      file?.path,
    )) as any;

    payload.image = secure_url;
    const newCustomer = await Customer.create([payload], { session });
    if (!newCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newCustomer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

const createVendor = async (password: string, payload: TVendor) => {
  const userData: Partial<TUser> = {};

  userData.userName = payload.userName;
  userData.password = password;
  userData.email = payload.email;
  userData.userType = "vendor";

  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Create User
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }
    payload.user = newUser[0]._id;

    // Transaction 2: Create Vendor

    const newVendor = await Vendor.create([payload], { session });

    if (!newVendor) {
      throw new AppError(httpStatus.BAD_REQUEST, "Vendor creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newVendor;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

const createAdmin = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.userName = payload.userName;
  userData.password = password;
  userData.email = payload.email;
  userData.userType = "admin";

  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Create User
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }
    payload.user = newUser[0]._id;

    // Transaction 2: Create Admin

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Admin creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getMe = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_access_secret as string);
  const { userId, userType } = decoded as JwtPayload;
  // check if user exists
  let result = null;
  if (userType === "customer") {
    result = await Customer.findById(userId).populate("user");
  } else if (userType === "vendor") {
    result = await Vendor.findById(userId).populate("user");
  } else if (userType === "admin") {
    result = await Admin.findById(userId).populate("user");
  }

  return result;
};

export const UserServices = {
  createCustomer,
  createVendor,
  createAdmin,
  getMe,
};
