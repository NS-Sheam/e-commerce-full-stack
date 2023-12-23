/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TVendor = {
  user: Types.ObjectId;
  userName: string;
  name: TName;
  email: string;
  mobileNo: string;
  image: string;
  orderHistory?: string[];
  review?: Types.ObjectId[];
  isDeleted: boolean;
};

export interface IVendorModel extends Model<TVendor> {
  existedVendor: (vendorId: string) => Promise<TVendor | null>;
}
