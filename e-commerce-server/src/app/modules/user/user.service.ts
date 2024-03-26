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
import { createToken, verifyToken } from "../Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { sendEmail } from "../../utils/sendEmail";

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
    if (file) {
      const { secure_url } = (await sendImageToCloudinary(
        payload.userName,
        file?.path,
      )) as any;

      payload.image = secure_url;
    }

    const newCustomer = await Customer.create([payload], { session });

    if (!newCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer creation failed");
    }
    const jwtPayload = {
      userId: newUser[0]._id,
      email: newUser[0].email,
      userType: newUser[0].userType,
    };

    const verifyEmailToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      "365d",
    );
    const verifyUrl = `${config.client_url}/auth/verify-email?token=${verifyEmailToken}`;
    sendEmail(
      verifyUrl,
      newUser[0].email,
      "Verify your email",
      "Verify Email",
      "Verify your email by clicking the link below:",
    );
    await session.commitTransaction();
    await session.endSession();
    return newCustomer[0];
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

const makeVendor = async (customerId: string) => {
  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Change Customer to Vendor
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer not found");
    }

    await Customer.findByIdAndDelete(customerId, { session });

    const newUpdatedUser = await User.findByIdAndUpdate(
      customer.user,
      { userType: "vendor" },
      { new: true, session },
    );

    if (!newUpdatedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User updation failed");
    }

    const newVendor = await Vendor.create(
      [
        {
          user: customer.user,
          userName: customer.userName,
          name: customer.name,
          email: customer.email,
          mobileNo: customer.mobileNo,
          image: customer.image,
        },
      ],
      { session },
    );

    if (!newVendor) {
      throw new AppError(httpStatus.BAD_REQUEST, "Vendor creation failed");
    }

    await session.commitTransaction();
    await session.endSession();
    return newVendor[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const makeAdmin = async (customerId: string) => {
  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Change Vendor to Admin
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer not found");
    }

    await Customer.findByIdAndDelete(customerId, { session });

    const newUpdatedUser = await User.findByIdAndUpdate(
      customer.user,
      { userType: "admin" },
      { new: true, session },
    );

    if (!newUpdatedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User updation failed");
    }

    const newAdmin = await Admin.create(
      [
        {
          user: customer.user,
          userName: customer.userName,
          name: customer.name,
          email: customer.email,
          mobileNo: customer.mobileNo,
          image: customer?.image,
        },
      ],
      { session },
    );

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Admin creation failed");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin[0];
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
    result = await Customer.findOne({ user: userId }).populate(
      "user wishList shoppingCart",
    );
  } else if (userType === "vendor") {
    result = await Vendor.findOne({ user: userId }).populate(
      "user orderHistory",
    );
  } else if (userType === "admin") {
    result = await Admin.findOne({ user: userId }).populate("user");
  }

  return result;
};

export const UserServices = {
  createCustomer,
  createVendor,
  createAdmin,
  makeVendor,
  makeAdmin,
  getMe,
};
