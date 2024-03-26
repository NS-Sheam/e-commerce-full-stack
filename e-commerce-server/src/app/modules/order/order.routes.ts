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

router.get("/payment/success/:transactionId", OrderControllers.paymentSuccess);
router.get("/payment/failed/:transactionId", OrderControllers.paymentFailed);
router.get(
  "/customer",
  auth(USER_TYPE.customer),
  OrderControllers.getOrderForCustomer,
);
router.get(
  "/vendor",
  auth(USER_TYPE.vendor),
  OrderControllers.getOrderForVendor,
);

router.get(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  OrderControllers.getSingleOrder,
);

router.get(
  "/",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  OrderControllers.getAllOrders,
);
router.patch(
  "/:id/status",
  auth(USER_TYPE.admin, USER_TYPE.superAdmin),
  OrderControllers.changeOrderStatus,
);

export const OrderRoutes = router;
