import { TName } from ".";

export type TCustomer = {
  _id: string;
  user: string;
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
