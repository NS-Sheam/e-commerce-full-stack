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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
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
        path: "dashboard",
        element: <Dashboard />,
        children: routesGenerator(vendorDashboardItems),
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: routesGenerator(customerDashboardItems),
      },
    ],
  },
]);

export default router;
