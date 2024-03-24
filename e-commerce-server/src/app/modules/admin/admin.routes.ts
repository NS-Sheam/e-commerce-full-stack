import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import { AdminValidations } from "./admin.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";

const router = Router();
router.get(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  AdminControllers.getSingleAdmin,
);
router.get(
  "/",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  AdminControllers.getAllAdmins,
);

router.patch(
  "/",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  upload.single("file"),
  textToJsonParser,
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
