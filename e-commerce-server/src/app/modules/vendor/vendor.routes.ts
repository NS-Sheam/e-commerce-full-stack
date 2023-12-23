import { Router } from "express";
import { vendorControllers } from "./vendor.controller";
import { VendorValidations } from "./vendor.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get("/:id", vendorControllers.getSingleVendor);
router.get("/", vendorControllers.getAllVendors);
router.patch(
  "/:id",
  validateRequest(VendorValidations.updateVendorValidationSchema),
  vendorControllers.updateVendor,
);
router.delete("/:id", vendorControllers.deleteVendor);

export const VendorRoutes = router;
