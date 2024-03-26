import { useState } from "react";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaMagnifyingGlass, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import logo from "../../../assets/icons/nazmus-sakib.png";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const userData = useAppSelector(selectCurrentUser);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const rightMenu = [
    {
      name: "cart",
      icon: (
        <Link
          to="/customer/shopping-cart"
          className="text-white hover:text-primary flex justify-center items-center "
        >
          <CiShoppingCart />
        </Link>
      ),
    },
    {
      name: "wishlist",
      icon: (
        <Link
          to="/customer/wishlist"
          className="text-white hover:text-primary flex justify-center items-center "
        >
          <CiHeart />
        </Link>
      ),
    },
    {
      name: "user",
      icon: userData ? (
        <Link
          to={`${userData.userType}/orders`}
          className="flex items-center justify-center"
        >
          {userData?.image ? (
            <img
              src={userData.image}
              alt="user"
              className="m-auto border-white border-2 w-7 md:w-10 h-7 md:h-10 rounded-full bg-white "
            />
          ) : (
            <CiUser className="text-white" />
          )}
        </Link>
      ) : (
        <Link
          to={`/auth`}
          className="text-white hover:text-primary flex justify-center items-center "
        >
          <CiUser />
        </Link>
      ),
    },
  ];

  const followIcons = [
    {
      name: "twitter",
      icon: <FaTwitter />,
    },
    {
      name: "facebook",
      icon: <FaFacebook />,
    },
    {
      name: "youtube",
      icon: <FaYoutube />,
    },
    {
      name: "pinterest",
      icon: <FaPinterest />,
    },
    {
      name: "instagram",
      icon: <FaInstagram />,
    },
  ];

  return (
    <section className="bg-primary ">
      <div className="text-sm lg:text-xl text-center lg:flex items-center justify-between inner-container lg:py-1">
        <p className="text-white font-semibold text-xs md:text-base">
          Welcome to Next Shop, the best online shopping site
        </p>
        <p className="flex items-center justify-center gap-2">
          <span className=" text-white text-base">Follow Us:</span>
          {followIcons.map((item) => (
            <span
              key={item.name}
              className="mx-2 inline-flex justify-center items-center lg:w-8 lg:h-8  rounded-full  text-white lg:hover:bg-white transition-all lg:hover:text-primary duration-300 ease-in-out cursor-pointer"
            >
              {item.icon}
            </span>
          ))}
        </p>
      </div>
      <hr className="bg-white h-[1px]" />
      <div className="relative grid grid-cols-5 justify-between py-1 inner-container">
        <div
          onClick={() => navigate("/")}
          className="flex justify-center items-center gap-2 col-span-2 md:col-span-1 cursor-pointer"
        >
          <img
            src={logo}
            alt="logo"
            style={{
              border: "2px solid #fa8232",
            }}
            className="w-8 md:w-12 h-8 md:h-12 rounded-full bg-white"
          />
          <h2 className="font-bold text-white text-sm md:text-xl">
            <span className="text-orange">Next</span> Shop
          </h2>
        </div>

        <div
          className={`absolute top-full lg:top-0 right-0 md:relative md:col-span-3 my-auto lg:mx-20 ${
            showSearch ? "block" : "hidden lg:block"
          }`}
        >
          <RxCross2
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden absolute cursor-pointer z-20 -left-5 top-1/2 -translate-y-1/2"
          />
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowSearch(!showSearch);
                navigate(`/shop?searchTerm=${searchTerm}`);
              }
            }}
            type="text"
            className="z-10 w-full py-2 px-4 border border-gray focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search"
          />
          <div className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <FaMagnifyingGlass
              onClick={() => {
                setShowSearch(!showSearch);
                navigate(`/shop?searchTerm=${searchTerm}`);
              }}
              className={`text-xl md:text-2xl text-gray`}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-8 col-span-3 md:col-span-1 text-xl md:text-3xl font-bold">
          {rightMenu.map((item) => (
            <div
              className="flex justify-center items-center lg:w-10 h-4 md:h-10 rounded-full md:hover:bg-white text-white md:hover:text-primary transition-all duration-300 ease-in-out cursor-pointer"
              key={item.name}
            >
              {item.icon}
            </div>
          ))}
          <FaMagnifyingGlass
            className={`${showSearch ? "hidden" : "block"} md:hidden text-sm lg:text-2xl text-white`}
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
