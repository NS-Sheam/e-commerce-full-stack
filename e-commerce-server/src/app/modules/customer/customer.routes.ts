import { Router } from "express";
import { CustomerControllers } from "./customer.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "./customer.validation";

const router = Router();
router.get("/:id", CustomerControllers.getSingleCustomer);
router.get("/", CustomerControllers.getAllCustomers);
router.patch(
  "/:id",
  validateRequest(CustomerValidations.updateCustomerValidationSchema),
  CustomerControllers.updateCustomer,
);
router.delete("/:id", CustomerControllers.deleteCustomer);

export const CustomerRoutes = router;
