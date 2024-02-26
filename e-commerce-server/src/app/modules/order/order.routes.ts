import { Router } from "express";
import { USER_TYPE } from "../user/user.const";
import auth from "../../middlewares/auth";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidations } from "./order.validation";

const router = Router();

router.post(
  "/",
  auth(USER_TYPE.customer),
  validateRequest(OrderValidations.addOrderValidationSchema),
  OrderControllers.addOrder,
);

router.get("/", auth(USER_TYPE.admin), OrderControllers.getAllOrders);

export const OrderRoutes = router;
