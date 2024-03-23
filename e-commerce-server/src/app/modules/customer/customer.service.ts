/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { customerSearchableFields } from "./customer.const";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const getAllCustomers = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(
    Customer.find().populate("wishList shoppingCart"),
    query,
  )
    .search(customerSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await customerQuery.modelQuery;

  return result;
};

const getSingleCustomer = async (customerId: string) => {
  const result = Customer.findById(customerId).populate(
    "wishList shoppingCart",
  );
  return result;
};

const updateCustomer = async (
  file: any,
  userId: string,
  payload: Partial<TCustomer>,
) => {
  const { name, email, userName, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }
  }
  const userObject: Record<string, unknown> = {};

  const userData = await User.findById(userId);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

  if (email) {
    modifiedObject.email = email;
    userObject.email = email;
  }
  if (userName) {
    userObject.userName = userName;
    modifiedObject.userName = userName;
  }
  if (file) {
    const { secure_url } = await sendImageToCloudinary(
      userData.userName,
      file?.path,
    );
    modifiedObject.image = secure_url;
  }
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const user = await User.findByIdAndUpdate({ _id: userId }, userObject, {
      new: true,
      session,
    });

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "User update failed");
    }
    const result = await Customer.findOneAndUpdate(
      { user: user._id },
      modifiedObject,
      { new: true, session },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer update failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const updateWishList = async (
  customerId: string,
  productId: Types.ObjectId,
) => {
  let result;
  const customer = await Customer.findOne({ user: customerId });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

  if (customer.wishList.includes(productId)) {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $pull: { wishList: productId } },
      { new: true },
    );
  } else {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $push: { wishList: productId } },
      { new: true },
    );
  }
  return result;
};
const updateShoppingCart = async (
  customerId: string,
  productId: Types.ObjectId,
) => {
  let result;
  const customer = await Customer.findOne({ user: customerId });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

  if (customer.shoppingCart.includes(productId)) {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $pull: { wishList: productId } },
      { new: true },
    );
  } else {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $push: { wishList: productId } },
      { new: true },
    );
  }
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
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const CustomerServices = {
  getAllCustomers,
  getSingleCustomer,
  updateWishList,
  updateShoppingCart,
  updateCustomer,
  deleteCustomer,
};
