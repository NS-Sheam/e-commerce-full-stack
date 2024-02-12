import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { TSidebarItem } from "../../types/dashboardItem.type";
import logoutIcon from "../../assets/icons/logout.png";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/auth.Slice";
import { NavLink } from "react-router-dom";
// {
//   path: "logout",
//   name: "Logout",
//   icon: (
//     <img
//       src={logoutIcon}
//       alt="logout"
//       className="w-6 h-6"
//     />
//   ),
//   element: ,
// },
const Sidebar = ({ items }: { items: TSidebarItem[] }) => {
  const dispatch = useAppDispatch();
  const logOutOption = {
    label: (
      <NavLink
        onClick={() => dispatch(logOut())}
        to={"/auth"}
      >
        Logout
      </NavLink>
    ),
    icon: (
      <img
        src={logoutIcon}
        alt="logout"
        className="w-6 h-6"
      />
    ),
    key: "logOut",
  };
  return (
    <Sider
      style={{ backgroundColor: "#fff" }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[items[0].key]}
        items={[...items, logOutOption]}
      />
    </Sider>
  );
};

export default Sidebar;
