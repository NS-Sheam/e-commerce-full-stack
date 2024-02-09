import "./dashboard.css";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { customerDashboardItems } from "../../router/customer.routes";
import Sidebar from "../../components/layout/Sidebar";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";

const { Content } = Layout;

const items = sidebarItemGenerator(customerDashboardItems);

const Dashboard = () => {
  return (
    <Layout>
      <Sidebar items={items} />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 10,
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
