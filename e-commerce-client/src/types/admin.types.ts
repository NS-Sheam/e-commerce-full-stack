import { TName, TUserData } from ".";

export type TAdmin = {
  _id: string;
  user: TUserData;
  userName: string;
  name: TName;
  email: string;
  mobileNo: string;
  image: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  fullName: string;
  id: string;
};
