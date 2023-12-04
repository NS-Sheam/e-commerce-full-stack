import { Router } from "express";
import { CustomerControllers } from "./customer.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "./customer.validation";

const router = Router();
router.get("/:customerId", CustomerControllers.getSingleCustomer);
router.get("/", CustomerControllers.getAllCustomers);
router.patch(
  "/:customerId",
  validateRequest(CustomerValidations.updateCustomerValidationSchema),
  CustomerControllers.updateCustomer,
);
router.delete("/:customerId", CustomerControllers.deleteCustomer);

export const CustomerRoutes = router;
