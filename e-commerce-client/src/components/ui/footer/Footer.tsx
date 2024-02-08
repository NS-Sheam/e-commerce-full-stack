import { Tag } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { AppStoreButton, GooglePlayButton } from "react-mobile-app-button";

const Footer = () => {
  return (
    <section className="inner-container bg-grayBlack py-6 md:py-10 lg:py-16 text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-4">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-warning my-3">Logo</h3>
        <p className="font-light">Customer Support</p>
        <p className="">099993333</p>
        <p className="font-light">4517 Washington Ave. Manchester, Kentucky 39495</p>
        <p className="">info@gmail.com</p>
      </div>
      <div className="space-y-1 flex items-start flex-col">
        <h3 className="text-xl font-bold">Top Category</h3>
        <p>Computer and laptop</p>
        <p>Smartphone</p>
        <p>Headphone</p>
        <div className="flex justify-center items-center gap-2">
          <hr className="w-8 h-1 bg-warning" />
          <p className="font-bold">Accessories</p>
        </div>
        <p>Camera & Photo</p>
        <p>TV & Homes</p>
        <p className="text-warning flex items-center justify-center gap-2">
          Browse All Product <FaArrowRight />
        </p>
      </div>
      <div className="space-y-1 ">
        <h3 className="text-xl font-bold">Quick links</h3>
        <p>Shop Product</p>
        <p>Shoping Cart</p>
        <p>Wishlist</p>
        <p>Compare</p>
        <p>Track Order</p>
        <p>Customer Help</p>
        <p>About Us</p>
      </div>
      <div className="space-y-2 flex flex-col items-start">
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
            "Computer",
          ].map((item) => {
            return (
              <Tag
                key={item}
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
