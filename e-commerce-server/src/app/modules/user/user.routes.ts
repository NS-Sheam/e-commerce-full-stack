import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "../customer/customer.validation";
import { VendorValidations } from "../vendor/vendor.validation";
import { AdminValidations } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "./user.const";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";

const router = Router();

// for hosting image cloudinary and multer is used
/*
router.post(
  "/create-customer",
  validateRequest(CustomerValidations.createCustomerValidationSchema),
  UserControllers.createCustomer,
);
 */
router.post(
  "/create-customer",
  upload.single("file"),
  textToJsonParser,
  validateRequest(CustomerValidations.createCustomerValidationSchema),
  UserControllers.createCustomer,
);

router.post(
  "/create-vendor",
  validateRequest(VendorValidations.createVendorValidationSchema),
  UserControllers.createVendor,
);

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get(
  "/me",
  auth(USER_TYPE.admin, USER_TYPE.customer, USER_TYPE.vendor),
  UserControllers.getMe,
);
export const UserRoutes = router;
