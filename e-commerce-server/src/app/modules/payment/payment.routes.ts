import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/init", PaymentController.initPayment);

router.get("/ipn", PaymentController.validatePayment);
export const paymentRoutes = router;
