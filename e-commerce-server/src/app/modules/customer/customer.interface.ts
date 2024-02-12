/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TCustomer = {
  user: Types.ObjectId;
  userName: string;
  name: TName;
  gender: "male" | "female" | "other";
  email: string;
  mobileNo: string;
  wishList: Types.ObjectId[];
  image?: string;
  isDeleted: boolean;
};

export interface ICustomerModel extends Model<TCustomer> {
  existedCustomer: (customerId: string) => Promise<TCustomer | null>;
}
