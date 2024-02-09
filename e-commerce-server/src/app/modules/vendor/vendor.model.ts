import { Schema, model } from "mongoose";
import { TName, TVendor } from "./vendor.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const nameSchema = new Schema<TName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const vendorSchema = new Schema<TVendor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: nameSchema,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    image: String,
    orderHistory: [Schema.Types.ObjectId],
    review: [Schema.Types.ObjectId],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

// showing fullname of vendor
vendorSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// checking if vendor already existed
vendorSchema.pre("save", async function (next) {
  const vendorId = this._id;
  const isVendorExist = await Vendor.findOne({ _id: vendorId });
  if (isVendorExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Vendor already exist");
  }
  next();
});

export const Vendor = model<TVendor>("Vendor", vendorSchema);
