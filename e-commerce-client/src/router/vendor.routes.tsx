// import dashboardIcon from "../assets/icons/dashboard.png";
import settingIcon from "../assets/icons/settings.png";
import productIcon from "../assets/icons/products.png";
import addProductIcon from "../assets/icons/add-product.png";
import orderIcon from "../assets/icons/orders.png";
// import transactionIcon from "../assets/icons/transaction.png";

import { TUserPath } from "../types/dashboardItem.type";
import AddProduct from "../pages/dashboard/vendor/AddProduct";
import Products from "../pages/dashboard/vendor/Products";
import Setting from "../pages/dashboard/Setting";
import Orders from "../pages/dashboard/order/Orders";
export const vendorDashboardItems: TUserPath[] = [
  // {
  //   path: "home",
  //   name: "Dashboard",
  //   icon: (
  //     <img
  //       src={dashboardIcon}
  //       alt="dashboard"
  //       className="w-6 h-6"
  //     />
  //   ),
  //   element: <div>Home</div>,
  // },

  {
    path: "orders",
    name: "Orders",
    icon: (
      <img
        src={orderIcon}
        alt="dashboard"
        className="w-6 h-6"
      />
    ),
    element: <Orders />,
  },
  {
    path: "products",
    name: "Products",
    icon: (
      <img
        src={productIcon}
        alt="products"
        className="w-6 h-6"
      />
    ),
    element: <Products />,
  },
  {
    path: "add-product",
    name: "Add Product",
    icon: (
      <img
        src={addProductIcon}
        alt="dashboard"
        className="w-6 h-6"
      />
    ),
    element: <AddProduct />,
  },

  // {
  //   path: "transactions",
  //   name: "Transactions",
  //   icon: (
  //     <img
  //       src={transactionIcon}
  //       alt="dashboard"
  //       className="w-6 h-6"
  //     />
  //   ),
  //   element: <div>Transactions</div>,
  // },
  {
    path: "setting",
    name: "Setting",
    icon: (
      <img
        src={settingIcon}
        alt="setting"
        className="w-6 h-6"
      />
    ),
    element: <Setting />,
  },
];
