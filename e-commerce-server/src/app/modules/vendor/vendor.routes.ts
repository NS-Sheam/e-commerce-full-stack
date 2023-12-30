import { Router } from "express";
import { vendorControllers } from "./vendor.controller";
import { VendorValidations } from "./vendor.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";

const router = Router();

router.get(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  vendorControllers.getSingleVendor,
);
router.get("/", auth(USER_TYPE.admin), vendorControllers.getAllVendors);
router.patch(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  validateRequest(VendorValidations.updateVendorValidationSchema),
  vendorControllers.updateVendor,
);
router.delete(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  vendorControllers.deleteVendor,
);

export const VendorRoutes = router;
