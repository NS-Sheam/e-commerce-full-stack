import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { CustomerRoutes } from "../modules/customer/customer.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/customers",
    route: CustomerRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
