import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TVendor } from "./vendor.interface";
import { Vendor } from "./vendor.model";
import { User } from "../user/user.model";
import { vendorSearchableFields } from "./vendor.const";

const getAllVendors = async (query: Record<string, unknown>) => {
  const vendorQuery = new QueryBuilder(Vendor.find(), query)
    .search(vendorSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await vendorQuery.modelQuery;
  return result;
};

const getSingleVendor = async (vendorId: string) => {
  const result = Vendor.findById(vendorId);
  return result;
};

const updateVendor = async (vendorId: string, payload: Partial<TVendor>) => {
  const { name, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }

    const result = Vendor.findByIdAndUpdate(vendorId, modifiedObject, {
      new: true,
    });
    return result;
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
