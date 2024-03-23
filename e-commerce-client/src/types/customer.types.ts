import { TName, TUserData } from ".";

export type TCustomer = {
  _id: string;
  user: TUserData;
  userName: string;
  name: TName;
  gender: string;
  email: string;
  mobileNo: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  wishList: string[];
  shoppingCart: any[];
  fullName: string;
  id: string;
};
