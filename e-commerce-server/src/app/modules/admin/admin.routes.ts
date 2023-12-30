import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import { AdminValidations } from "./admin.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";

const router = Router();
router.get("/:id", auth(USER_TYPE.admin), AdminControllers.getSingleAdmin);
router.get("/", auth(USER_TYPE.admin), AdminControllers.getAllAdmins);

router.patch(
  "/:id",
  auth(USER_TYPE.admin),
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete("/:id", auth(USER_TYPE.admin), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
