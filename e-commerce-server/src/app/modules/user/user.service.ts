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

export const UserServices = {
  createCustomer,
  createVendor,
  createAdmin,
};
