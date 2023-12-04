import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "../customer/customer.validation";
import { VendorValidations } from "../vendor/vendor.validation";

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

export const UserRoutes = router;
