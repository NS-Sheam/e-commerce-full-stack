import dashboardIcon from "../assets/icons/dashboard.png";
import orderHistoryIcon from "../assets/icons/order-history.png";
import trackOrderIcon from "../assets/icons/tracking.png";
import shoppingCartIcon from "../assets/icons/shopping-cart.png";
import wishlistIcon from "../assets/icons/wishlist.png";
import compareIcon from "../assets/icons/swap.png";
import cardAndAddressIcon from "../assets/icons/card-address.png";
import browsingHistoryIcon from "../assets/icons/history.png";
import settingIcon from "../assets/icons/settings.png";
import { TUserPath } from "../types/dashboardItem.type";
import Products from "../pages/dashboard/vendor/Products";
import productIcon from "../assets/icons/products.png";
import WishList from "../pages/WishList";

export const customerDashboardItems: TUserPath[] = [
  {
    path: "home",
    name: "Dashboard",
    icon: (
      <img
        src={dashboardIcon}
        alt="dashboard"
        className="w-6 h-6"
      />
    ),
    element: <div>Home</div>,
  },
  {
    path: "order-history",
    name: "Order History",
    icon: (
      <img
        src={orderHistoryIcon}
        alt="order history"
        className="w-6 h-6"
      />
    ),
    element: <div>Products</div>,
  },
  {
    path: "track-order",
    name: "Track Order",
    icon: (
      <img
        src={trackOrderIcon}
        alt="track order"
        className="w-6 h-6"
      />
    ),
    element: <div>Track Order</div>,
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
    path: "shopping-cart",
    name: "Shopping Cart",
    icon: (
      <img
        src={shoppingCartIcon}
        alt="shopping cart"
        className="w-6 h-6"
      />
    ),
    element: <div>shopping cart</div>,
  },
  {
    path: "wishlist",
    name: "Wishlist",
    icon: (
      <img
        src={wishlistIcon}
        alt="wishlist"
        className="w-6 h-6"
      />
    ),
    element: <WishList />,
  },
  {
    path: "compare",
    name: "Compare",
    icon: (
      <img
        src={compareIcon}
        alt="compare"
        className="w-6 h-6"
      />
    ),
    element: <div>compare</div>,
  },
  {
    path: "card-and-address",
    name: "Card and Address",
    icon: (
      <img
        src={cardAndAddressIcon}
        alt="card and address"
        className="w-6 h-6"
      />
    ),
    element: <div>card-and-address</div>,
  },

  {
    path: "browsing-history",
    name: "Browsing History",
    icon: (
      <img
        src={browsingHistoryIcon}
        alt="browsing history"
        className="w-6 h-6"
      />
    ),
    element: <div>browsing-history</div>,
  },
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
    element: <div>setting</div>,
  },
];
