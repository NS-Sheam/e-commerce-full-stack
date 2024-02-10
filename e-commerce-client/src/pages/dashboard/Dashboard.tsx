import "./dashboard.css";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { vendorDashboardItems } from "../../router/vendor.routes";

const { Content } = Layout;

const items = sidebarItemGenerator(vendorDashboardItems);

const Dashboard = () => {
  return (
    <Layout>
      <Sidebar items={items} />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              //   padding: 10,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
