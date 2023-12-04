import { Schema, model } from "mongoose";
import { TCustomer, TName } from "./customer.interface";

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

const customerSchema = new Schema<TCustomer>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: nameSchema,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Customer = model<TCustomer>("Customer", customerSchema);
