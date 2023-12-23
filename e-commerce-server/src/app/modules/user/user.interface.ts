export type TUser = {
  userName: string;
  password: string;
  email: string;
  userType: "customer" | "vendor" | "admin";
  isDeleted: boolean;
};
