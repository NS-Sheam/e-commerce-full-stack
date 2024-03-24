/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TVendor } from "./vendor.interface";
import { Vendor } from "./vendor.model";
import { User } from "../user/user.model";
import { vendorSearchableFields } from "./vendor.const";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const getAllVendors = async (query: Record<string, unknown>) => {
  const vendorQuery = new QueryBuilder(Vendor.find(), query)
    .search(vendorSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await vendorQuery.modelQuery;
  const meta = await vendorQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleVendor = async (vendorId: string) => {
  const result = Vendor.findById(vendorId);
  return result;
};

const updateVendor = async (
  file: any,
  userId: string,
  payload: Partial<TVendor>,
) => {
  const { name, email, userName, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }
    const userObject: Record<string, unknown> = {};
    const userData = await User.findById(userId);
    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, "Vendor not found");
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
      const result = await Vendor.findOneAndUpdate(
        { user: user._id },
        modifiedObject,
        { new: true, session },
      );
      if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, "Vendor update failed");
      }
      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
};

const deleteVendor = async (vendorId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Vendor.findById({ _id: vendorId }, { user: 1, _id: 0 });

    const userId = user?.user.toString();

    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new Error("User deletion failed");
    }

    // Transaction 2: Delete vendor
    const deletedVendor = await Vendor.findByIdAndUpdate(
      { _id: vendorId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedVendor) {
      throw new Error("Vendor deletion failed");
    }

    await session.commitTransaction();
    session.endSession();
    return deletedVendor;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const vendorServices = {
  getAllVendors,
  getSingleVendor,
  updateVendor,
  deleteVendor,
};
