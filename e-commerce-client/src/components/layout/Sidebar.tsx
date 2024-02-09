import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { TSidebarItem } from "../../types/dashboardItem.type";

const Sidebar = ({ items }: { items: TSidebarItem[] }) => {
  return (
    <Sider
      style={{ backgroundColor: "#fff" }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[items[0].key]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
