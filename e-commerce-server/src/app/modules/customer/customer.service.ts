import mongoose from "mongoose";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getAllCustomers = async (query: Record<string, unknown>) => {
  const queryObject: Record<string, unknown> = { ...query };

  let searchTerm = "";
  const excludeFields = ["searchTerm", "limit", "sort"];
  excludeFields.forEach((field) => delete queryObject[field]);
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchFields = ["name.firstName", "name.lastName", "email"];

  const searchQuery = Customer.find({
    $or: searchFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  let sort = "-createdAt";
  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = searchQuery.sort(sort);

  let limit = 10;
  if (query?.limit) {
    limit = Number(query.limit);
  }

  const limitQuery = sortQuery.limit(limit);

  const result = await limitQuery.find(queryObject);
  return result;
};

const getSingleCustomer = async (customerId: string) => {
  const result = Customer.findById(customerId);
  return result;
};

const updateCustomer = async (
  customerId: string,
  payload: Partial<TCustomer>,
) => {
  const { name, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }
  }
  const result = Customer.findByIdAndUpdate(customerId, modifiedObject, {
    new: true,
  });
  return result;
};

const deleteCustomer = async (customerId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Customer.findById(
      { _id: customerId },
      { user: 1, _id: 0 },
    );

    const userId = user?.user.toString();

    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User deletion failed");
    }
    // Transaction 2: Delete Customer
    const deletedCustomer = await Customer.findByIdAndUpdate(
      { _id: customerId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer deletion failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedCustomer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error.message);
  }
};

export const CustomerServices = {
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
