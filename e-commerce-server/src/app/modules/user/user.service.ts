import mongoose from "mongoose";
import { TCustomer } from "../customer/customer.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Customer } from "../customer/customer.model";

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
      throw new Error("User creation failed");
    }
    payload.user = newUser[0]._id;

    // Transaction 2: Create Customer
    const newCustomer = await Customer.create([payload], { session });
    if (!newCustomer) {
      throw new Error("Customer creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newCustomer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
};

export const UserServices = {
  createCustomer,
};
