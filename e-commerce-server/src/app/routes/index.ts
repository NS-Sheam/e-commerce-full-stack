import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { CustomerRoutes } from "../modules/customer/customer.routes";
import { VendorRoutes } from "../modules/vendor/vendor.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";

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
  {
    path: "/vendors",
    route: VendorRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
