import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { CustomerRoutes } from "../modules/customer/customer.routes";
import { VendorRoutes } from "../modules/vendor/vendor.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { ReviewRoutes } from "../modules/review/review.routes";

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
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
