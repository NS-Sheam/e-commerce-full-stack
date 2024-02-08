import { Outlet } from "react-router-dom";
import Footer from "../ui/footer/Footer";
import Navbar from "../ui/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="container bg-white max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
