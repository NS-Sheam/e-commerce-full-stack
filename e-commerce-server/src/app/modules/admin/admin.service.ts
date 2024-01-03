import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { adminSearchableFields } from "./admin.const";

const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdmin = async (adminId: string) => {
  const result = Admin.findById(adminId);
  return result;
};

const updateAdmin = async (adminId: string, payload: Partial<TAdmin>) => {
  const { name, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }

    const result = Admin.findByIdAndUpdate(adminId, modifiedObject, {
      new: true,
    });
    return result;
  }
};

const deleteAdmin = async (adminId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Admin.findById({ _id: adminId }, { user: 1, _id: 0 });
    const userId = user?.user.toString();
    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User deletion failed");
    }
    // Transaction 2: Delete Admin
    const deletedAdmin = await Admin.findByIdAndUpdate(
      { _id: adminId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Admin deletion failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const adminServices = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
