import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validation";
import { CategoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";

const router = Router();
router.post(
  "/",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get("/", CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
