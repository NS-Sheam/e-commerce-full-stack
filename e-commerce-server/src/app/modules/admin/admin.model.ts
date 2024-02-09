import { Schema, model } from "mongoose";
import { TAdmin, TName } from "./admin.interface";
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

const adminSchema = new Schema<TAdmin>(
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

// showing fullname of admin
adminSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// checking if admin already existed
adminSchema.pre("save", async function (next) {
  const adminId = this._id;
  const isAdminExist = await Admin.findOne({ _id: adminId });
  if (isAdminExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin already existed");
  }
  next();
});

export const Admin = model<TAdmin>("Admin", adminSchema);
