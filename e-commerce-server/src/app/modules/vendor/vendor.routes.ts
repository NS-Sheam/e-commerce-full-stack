import { Router } from "express";
import { vendorControllers } from "./vendor.controller";
import { VendorValidations } from "./vendor.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";

const router = Router();

router.get(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  vendorControllers.getSingleVendor,
);
router.get("/", auth(USER_TYPE.admin), vendorControllers.getAllVendors);
router.patch(
  "/",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  upload.single("file"),
  textToJsonParser,
  validateRequest(VendorValidations.updateVendorValidationSchema),
  vendorControllers.updateVendor,
);
router.delete(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  vendorControllers.deleteVendor,
);

export const VendorRoutes = router;
