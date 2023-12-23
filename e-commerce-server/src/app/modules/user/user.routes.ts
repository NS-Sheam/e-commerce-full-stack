import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "../customer/customer.validation";
import { VendorValidations } from "../vendor/vendor.validation";
import { AdminValidations } from "../admin/admin.validation";

const router = Router();

router.post(
  "/create-customer",
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
export const UserRoutes = router;
