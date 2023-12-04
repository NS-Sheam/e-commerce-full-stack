import mongoose from "mongoose";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";

const getAllCustomers = async () => {
  const result = await Customer.find();
  return result;
};

const getSingleCustomer = async (id: string) => {
  const result = Customer.findById(id);
  return result;
};

const updateCustomer = async (id: string, payload: Partial<TCustomer>) => {
  const { name, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }
  }
  const result = Customer.findByIdAndUpdate(id, modifiedObject, {
    new: true,
  });
  return result;
};

const deleteCustomer = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Customer.findById({ _id: id }, { user: 1, _id: 0 });

    const userId = user?.user.toString();

    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new Error("User deletion failed");
    }
    // Transaction 2: Delete Customer
    const deletedCustomer = await Customer.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedCustomer) {
      throw new Error("Customer deletion failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedCustomer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const CustomerServices = {
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
