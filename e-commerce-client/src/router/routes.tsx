import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Auth from "../pages/auth/Auth";
import Dashboard from "../pages/dashboard/Dashboard";
import { routesGenerator } from "../utils/routeGenerator";
import { customerDashboardItems } from "./customer.routes";
import { vendorDashboardItems } from "./vendor.routes";
import ProductDetails from "../pages/ProductDetails";
import { adminDashboardItems } from "./admin.routes";
import Checkout from "../pages/dashboard/Checkout";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailed from "../pages/payment/PaymentFailed";
import SingleOrder from "../pages/dashboard/order/SingleOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute role={["customer", "vendor"]}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "customer",
        element: (
          <ProtectedRoute role="customer">
            <Dashboard />
          </ProtectedRoute>
        ),
        children: routesGenerator(customerDashboardItems),
      },
      {
        path: "vendor",
        element: (
          <ProtectedRoute role="vendor">
            <Dashboard />
          </ProtectedRoute>
        ),
        children: routesGenerator(vendorDashboardItems),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        ),
        children: routesGenerator(adminDashboardItems),
      },
      {
        path: "/payment/success/:transactionId",
        element: (
          <ProtectedRoute role={["customer"]}>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment/failed/:transactionId",
        element: (
          <ProtectedRoute role={["customer"]}>
            <PaymentFailed />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:orderId/:productId",
        element: (
          <ProtectedRoute role={["customer"]}>
            <SingleOrder />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
