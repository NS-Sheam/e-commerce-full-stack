import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/dashboardItem.type";

export const sidebarItemGenerator = (paths: TUserPath[]) => {
  const sidebarItemGenerator = paths.reduce((acc: TSidebarItem[], item) => {
    acc.push({
      key: item.name,
      icon: item.icon,
      label: <NavLink to={item.path}>{item.name}</NavLink>,
    });
    return acc;
  }, []);

  return sidebarItemGenerator;
};
