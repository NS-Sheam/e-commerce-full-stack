import { Schema, model } from "mongoose";
import { TCustomer, TName } from "./customer.interface";
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

const customerSchema = new Schema<TCustomer>(
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
    },
    image: String,
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

// showing fullname of customer
customerSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// checking if customer already existed
customerSchema.pre("save", async function (next) {
  const customerId = this._id;
  const isCustomerExist = await Customer.findOne({ _id: customerId });
  if (isCustomerExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer already exist");
  }
  next();
});

export const Customer = model<TCustomer>("Customer", customerSchema);
