import { Tag } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { AppStoreButton, GooglePlayButton } from "react-mobile-app-button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import logo from "../../../assets/icons/nazmus-sakib.png";

const Footer = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  return (
    <section
      className={`inner-container bg-grayBlack py-6 md:py-10 lg:py-16 text-white grid grid-cols-1 ${
        user?.userType === "customer" ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-4"
      } items-center justify-between gap-4`}
    >
      <div className="space-y-1">
        <div
          onClick={() => navigate("/")}
          className="flex flex-col justify-center items-start gap-2 col-span-2 md:col-span-1 cursor-pointer"
        >
          <img
            src={logo}
            alt="logo"
            style={{
              border: "2px solid #fa8232",
            }}
            className=" w-8 md:w-12 h-8 md:h-12 rounded-full bg-white"
          />
          <h2 className="font-bold text-white text-sm md:text-xl">
            <span className="text-orange">Next</span> Shop
          </h2>
        </div>
        <h3 className="text-xl font-bold">Customer Support</h3>
        <p>+01800011122</p>
        <p>Mirpur, Dhaka, Bangladesh</p>
        <p>next-shop@gmail.com</p>
      </div>
      <div className="space-y-1 flex items-start flex-col">
        <h3 className="text-xl font-bold">Top Category</h3>
        <p className="cursor-pointer hover:underline">Computer and laptop</p>
        <p className="cursor-pointer hover:underline">Smartphone</p>
        <p className="cursor-pointer hover:underline">Headphone</p>
        <div className="flex justify-center items-center gap-2">
          <hr className="w-8 h-1 bg-warning" />
          <p className="font-bold">Accessories</p>
        </div>
        <p className="cursor-pointer hover:underline">Camera & Photo</p>
        <p className="cursor-pointer hover:underline">TV & Homes</p>
        <p
          onClick={() => navigate("/shop")}
          className="cursor-pointer text-warning flex items-center justify-center gap-2"
        >
          Browse All Product <FaArrowRight />
        </p>
      </div>
      {user && user.userType === "customer" && (
        <div className={`space-y-1`}>
          <h3 className="text-xl font-bold">Quick links</h3>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/shop")}
          >
            Shop Product
          </p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/customer/shopping-cart")}
          >
            Shoping Cart
          </p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/customer/wishlist")}
          >
            Wishlist
          </p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Compare
          </p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Track Order
          </p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Customer Help
          </p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            About Us
          </p>
        </div>
      )}
      <div className="space-y-2 flex flex-col items-start order">
        <h3 className="text-xl font-bold">Download App</h3>
        <div className="flex flex-col gap-3 justify-center items-center">
          <GooglePlayButton
            url=""
            theme={"dark"}
          />
          <AppStoreButton
            url=""
            theme="dark"
          />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Popular Tag</h3>
        <div>
          {[
            "Game",
            "Phone",
            "Laptop",
            "Camera",
            "Watch",
            "Headphone",
            "TV",
            "Smartphone",
            "Computer",
            "Camera",
            "Watch",
            "Headphone",
            "TV",
            "Smartphone",
          ].map((item, index) => {
            return (
              <Tag
                key={index}
                color="default"
                className="m-1"
              >
                {item}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Footer;
