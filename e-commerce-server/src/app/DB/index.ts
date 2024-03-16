import config from "../config";
import { USER_TYPE } from "../modules/user/user.const";
import { User } from "../modules/user/user.model";

const superAdmin = {
  userName: "superAdmin",
  password: config.super_admin_password,
  email: "123sheamfeni@gmail.com",
  userType: USER_TYPE.superAdmin,
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  // when database is connected, we will check is thee any user who super admin
  const isSuperAdminExists = await User.findOne({
    userType: USER_TYPE.superAdmin,
  });

  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
