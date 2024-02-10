import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";
import { ReviewControllers } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidations } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth(USER_TYPE.customer),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.addReview,
);

router.get("/:id", ReviewControllers.getSingleReview);
router.get("/", ReviewControllers.getReviews);
router.patch(
  "/:id",
  auth(USER_TYPE.customer),
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewControllers.updateReview,
);
router.delete("/:id", auth(USER_TYPE.customer), ReviewControllers.deleteReview);

export const ReviewRoutes = router;
