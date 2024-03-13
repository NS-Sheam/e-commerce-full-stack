import { TName } from ".";

export type TVendor = {
  _id: string;
  user: string;
  userName: string;
  name: TName;
  email: string;
  mobileNo: string;
  image: string;
  orderHistory: any[];
  review: any[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
};
