import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Auth from "../pages/auth/Auth";
import Dashboard from "../pages/dashboard/Dashboard";

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
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "home",
            element: <div>Dashboard</div>,
          },
          {
            path: "order-history",
            element: <div>Products</div>,
          },
          {
            path: "track-order",
            element: <div>Orders</div>,
          },
          {
            path: "shopping-cart",
            element: <div>wishlist</div>,
          },
          {
            path: "wishlist",
            element: <div>wishlist</div>,
          },
          {
            path: "compare",
            element: <div>compare</div>,
          },
          {
            path: "card-and-address",
            element: <div>card-and-address</div>,
          },

          {
            path: "browsing-history",
            element: <div>browsing-history</div>,
          },
          {
            path: "setting",
            element: <div>setting</div>,
          },
          {
            path: "logout",
            element: <div>logout</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
