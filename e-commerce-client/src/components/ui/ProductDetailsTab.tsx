import { Col, Row } from "antd";
import { FaRegHandshake } from "react-icons/fa6";
import { FiHeadphones } from "react-icons/fi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import ProductReview from "./ProductReview";
import { TProduct } from "../../types/product.types";
import { useState } from "react";

const ProductDetailsTab = ({ product }: { product: TProduct }) => {
  const [activeTab, setActiveTab] = useState("description");
  const featuresItems = [
    {
      icon: <SlBadge />,
      text: "Free 1 Year Warranty",
    },
    {
      icon: <LiaShippingFastSolid />,
      text: "Free Shipping & Fasted Delivery",
    },
    {
      icon: <FaRegHandshake />,
      text: "100% Money-back guarantee",
    },
    {
      icon: <FiHeadphones />,
      text: "24/7 Customer support",
    },
    {
      icon: <MdOutlinePayment />,
      text: "Secure payment method",
    },
  ];

  const shippingInfo = [
    {
      courier: "Courier",
      duration: "2 - 4 days",
      cost: "free shipping",
    },
    {
      courier: "UPS Ground Shipping",
      duration: "4 - 6 days",
      cost: "$29.00",
    },
    {
      courier: "Unishop Global Export",
      duration: "3 - 4 days",
      cost: "$39.00",
    },
  ];

  return (
    <div className="space-y-4">
      <div
        style={{ border: "3px solid #E4E7E9" }}
        className="flex w-full items-center justify-center text-xl font-semibold"
      >
        <p
          onClick={() => setActiveTab("description")}
          style={{
            borderBottom: `${activeTab === "description" ? "5px solid #fa8232" : ""}`,
            padding: "0.5rem 0.5rem ",
            cursor: "pointer",
          }}
        >
          Description
        </p>
        <p
          onClick={() => setActiveTab("review")}
          style={{
            borderBottom: `${activeTab === "review" ? "5px solid #fa8232" : ""}`,
            padding: "0.5rem 0.5rem",
            cursor: "pointer",
          }}
        >
          Review
        </p>
      </div>
      {/* Description section  */}
      <Row
        gutter={[16, 16]}
        justify={"center"}
        align={"top"}
        style={{ padding: "1rem", borderBottom: "2px solid #E4E7E9" }}
        className={`${activeTab === "description" ? "" : "hidden"}`}
      >
        <Col
          span={24}
          md={{ span: 8 }}
          className="space-y-2"
        >
          <h3>Description</h3>
          <p className="text-gray">{product?.description}</p>
        </Col>
        <Col
          span={24}
          md={{ span: 8 }}
          className="relative "
        >
          <h3>Features</h3>
          <div className="absolute w-[1px] h-3/4 bg-gray left-0 top-1/2 transform -translate-y-1/2"></div>
          <ul className="space-y-1 mt-2 ">
            {featuresItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
              >
                <span className="text-orange text-xl">{item.icon}</span>
                <span className="text-grayBlack font-bold">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="absolute w-[1px] h-3/4 bg-gray right-0 top-1/2 transform -translate-y-1/2"></div>
        </Col>
        <Col
          span={24}
          md={{ span: 8 }}
        >
          <h3>Shipping Information</h3>
          <ul className="space-y-2 mt-2">
            {shippingInfo.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
              >
                <span className="font-bold">{item.courier}</span>
                <span className="text-grayBlack ">{item.duration}</span>
                <span className="text-grayBlack">{item.cost}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      {/* Review section  */}
      {activeTab === "review" && <ProductReview product={product} />}
    </div>
  );
};

export default ProductDetailsTab;
