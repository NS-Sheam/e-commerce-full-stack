// const
// const item2 = [
//   {
//     key: "1",
//     icon: <div>icon1</div>,
//     label: "nav 1",
//   },
//   {
//     key: "2",
//     icon: <div>icon2</div>,
//     label: "nav 2",
//   },
//   {
//     key: "3",
//     icon: <div>icon3</div>,
//     label: "nav 3",
//   },
//   {
//     key: "4",
//     icon: <div>icon4</div>,
//     label: "nav 4",
//   },
// ];

// {
//     path: "dashboard",
//     element: <Dashboard />,
//     children: [
//       {
//         path: "home",
//         element: <div>Dashboard</div>,
//       },
//       {
//         path: "order-history",
//         element: <div>Products</div>,
//       },
//       {
//         path: "track-order",
//         element: <div>Orders</div>,
//       },
//       {
//         path: "shopping-cart",
//         element: <div>wishlist</div>,
//       },
//       {
//         path: "wishlist",
//         element: <div>wishlist</div>,
//       },
//       {
//         path: "compare",
//         element: <div>compare</div>,
//       },
//       {
//         path: "card-and-address",
//         element: <div>card-and-address</div>,
//       },

//       {
//         path: "browsing-history",
//         element: <div>browsing-history</div>,
//       },
//       {
//         path: "setting",
//         element: <div>setting</div>,
//       },
//       {
//         path: "logout",
//         element: <div>logout</div>,
//       },
//     ],
//   },
// const path = [
//   {
//     path: "home",
//     name: "Dashboard",
//     icon: "dashboardIcon",
//     element: "Home",
//   },
//   {
//     path: "order-history",
//     name: "Order History",
//     icon: "orderHistoryIcon",
//     element: "Products",
//   },
//   {
//     path: "track-order",
//     name: "Track Order",
//     icon: "trackOrderIcon",
//     element: "Orders",
//   },
//   {
//     path: "shopping-cart",
//     name: "Shopping Cart",
//     icon: "shoppingCartIcon",
//     element: "wishlist",
//   },
//   {
//     path: "wishlist",
//     name: "Wishlist",
//     icon: "wishlistIcon",
//     element: "wishlist",
//   },
//   {
//     path: "compare",
//     name: "Compare",
//     icon: "compareIcon",
//     element: "compare",
//   },
//   {
//     path: "card-and-address",
//     name: "Card and Address",
//     icon: "cardAndAddressIcon",
//     element: "card-and-address",
//   },

//   {
//     path: "browsing-history",
//     name: "Browsing History",
//     icon: "browsingHistoryIcon",
//     element: "browsing-history",
//   },
//   {
//     path: "setting",
//     name: "Setting",
//     icon: "settingIcon",
//     element: "setting",
//   },
//   {
//     path: "logout",
//     name: "Logout",
//     icon: "logoutIcon",
//     element: "logout",
//   },
// ];

// const routeGenerator = path.reduce((acc, item) => {
//   acc.push({
//     path: item.path,
//     element: item.element,
//   });
//   return acc;
// }, []);

// const sidebarItemGenerator = path.reduce((acc, item) => {
//   acc.push({
//     key: item.path,
//     icon: item.icon,
//     label: "Navlink" + item.name,
//   });
//   return acc;
// }, []);
