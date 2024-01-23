import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaMagnifyingGlass, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa6";

const Navbar = () => {
  const rightMenu = [
    {
      name: "cart",
      icon: <CiShoppingCart />,
    },
    {
      name: "wishlist",
      icon: <CiHeart />,
    },
    {
      name: "user",
      icon: <CiUser />,
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
      <div className="text-sm lg:text-xl text-center lg:flex items-center justify-between lg:py-2 inner-container">
        <p className="text-white">Welcome to My-commerce online e-commerce store</p>
        <p className="flex items-center justify-center gap-2">
          <span className=" text-white">Follow Us:</span>
          {followIcons.map((item) => (
            <span
              key={item.name}
              className="mx-2 inline-flex justify-center items-center lg:w-8 lg:h-8 text-sm rounded-full lg:bg-white text-white lg:text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
            >
              {item.icon}
            </span>
          ))}
        </p>
      </div>
      <hr className="bg-white h-[1px]" />
      <div className="grid grid-cols-5 justify-between py-2 inner-container">
        <div className="flex justify-start items-center gap-2 col-span-1 text-white font-bold text-xl lg:text-2xl">
          <h2
            className="bg-white rounded-full w-8 h-8 lg:w-12 lg:h-12 flex justify-center items-center"
            style={{ color: "#f44336" }}
          >
            2
          </h2>
          <h2>ClickMe</h2>
        </div>
        <div className="relative col-span-2 my-auto hidden lg:block">
          <input
            type="text"
            className=" w-full py-2 px-4 border border-gray focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search"
          />
          <FaMagnifyingGlass className="absolute top-2 right-4 text-2xl text-gray" />
        </div>
        <div className="flex justify-end items-center gap-8 col-span-2 text-3xl font-bold">
          {rightMenu.map((item) => (
            <div
              className="flex justify-center items-center w-12 h-12 rounded-full hover:bg-white text-white hover:text-primary transition-all duration-300 ease-in-out cursor-pointer"
              key={item.name}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
