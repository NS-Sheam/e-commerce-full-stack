import { Schema, model } from "mongoose";
import { TName, TVendor } from "./vendor.interface";

const nameSchema = new Schema<TName>({
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
});

const vendorSchema = new Schema<TVendor>({
  user: Schema.Types.ObjectId,
  name: nameSchema,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  orderHistory: [Schema.Types.ObjectId],
  review: [Schema.Types.ObjectId],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Vendor = model<TVendor>("Vendor", vendorSchema);
