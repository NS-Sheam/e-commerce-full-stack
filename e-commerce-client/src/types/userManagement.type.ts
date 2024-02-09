/**
 * TODO:
 * - make type for order history and review
 */

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TUser = {
  _id: string;
  user: string;
  userName: string;
  name: TName;
  email: string;
  mobileNo: string;
  image: string;
  isDeleted: boolean;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  orderHistory?: string[];
  review?: string[];
};
