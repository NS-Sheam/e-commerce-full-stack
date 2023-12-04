export type TUser = {
  userName: string;
  password: string;
  userType: "customer" | "vendor" | "admin";
  isDeleted: boolean;
};
