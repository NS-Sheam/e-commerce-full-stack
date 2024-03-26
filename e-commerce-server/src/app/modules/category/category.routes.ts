import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validation";
import { CategoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";

const router = Router();
router.post(
  "/",
  upload.single("file"),
  textToJsonParser,
  auth(USER_TYPE.superAdmin, USER_TYPE.admin, USER_TYPE.vendor),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.patch(
  "/:id",
  upload.single("file"),
  textToJsonParser,
  auth(USER_TYPE.superAdmin, USER_TYPE.admin, USER_TYPE.vendor),
  CategoryControllers.updateCategory,
);

router.get("/", CategoryControllers.getAllCategories);
router.delete(
  "/:id",
  auth(USER_TYPE.superAdmin, USER_TYPE.admin),
  CategoryControllers.deleteCategory,
);

export const CategoryRoutes = router;
