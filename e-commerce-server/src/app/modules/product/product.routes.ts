import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidationSchema } from "./product.validation";
import { productControllers } from "./product.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";

const router = Router();
router.post(
  "/",
  auth(USER_TYPE.vendor),
  upload.array("file", 5),
  textToJsonParser,

  validateRequest(ProductValidationSchema.createProductValidationSchema),
  productControllers.createProduct,
);
// router.post(
//   "/",
//   auth(USER_TYPE.vendor),
//   validateRequest(ProductValidationSchema.createProductValidationSchema),
//   productControllers.createProduct,
// );

router.get("/:id", productControllers.getSingleProduct);
router.get("/", productControllers.getAllProuducts);
router.put(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.vendor),
  validateRequest(ProductValidationSchema.updateProductValidationSchema),
  productControllers.updateProduct,
);
router.delete(
  "/:id",
  auth(USER_TYPE.vendor, USER_TYPE.admin),
  productControllers.deleteProduct,
);

export const ProductRoutes = router;
