import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post("/verify-email", AuthControllers.verifyEmail);

router.post(
  "/change-password",
  auth(USER_TYPE.admin, USER_TYPE.customer, USER_TYPE.vendor),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  "/forget-password",
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);
router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
