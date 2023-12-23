/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  userName: string;
  name: TName;
  email: string;
  mobileNo: string;
  image: string;
  isDeleted: boolean;
};

export interface IAdminModel extends Model<TAdmin> {
  existedAdmin: (adminId: string) => Promise<TAdmin | null>;
}
