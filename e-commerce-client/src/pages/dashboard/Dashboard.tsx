import "./dashboard.css";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { vendorDashboardItems } from "../../router/vendor.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/auth.Slice";
import { customerDashboardItems } from "../../router/customer.routes";
import { adminDashboardItems } from "../../router/admin.routes";
import { superAdminDashboardItems } from "../../router/superAdmin.routes";

const { Content } = Layout;

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const items =
    user?.userType === "superAdmin"
      ? sidebarItemGenerator(superAdminDashboardItems)
      : user?.userType === "admin"
      ? sidebarItemGenerator(adminDashboardItems)
      : user?.userType === "vendor"
      ? sidebarItemGenerator(vendorDashboardItems)
      : sidebarItemGenerator(customerDashboardItems);

  return (
    <Layout>
      {/* <h1>{user? }</h1> */}
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
