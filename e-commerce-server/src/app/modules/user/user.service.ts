import mongoose from "mongoose";
import { TCustomer } from "../customer/customer.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Customer } from "../customer/customer.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TVendor } from "../vendor/vendor.interface";
import { Vendor } from "../vendor/vendor.model";

const createCustomer = async (
  userName: string,
  password: string,
  payload: TCustomer,
) => {
  const userData: Partial<TUser> = {};
  userData.userName = userName;
  userData.password = password;
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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};

const createVendor = async (
  userName: string,
  password: string,
  payload: TVendor,
) => {
  const userData: Partial<TUser> = {};
  userData.userName = userName;
  userData.password = password;
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
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(500, error.message);
  }
};

export const UserServices = {
  createCustomer,
  createVendor,
};
