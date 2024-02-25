import { Col, Row, Tag } from "antd";
import { TProduct } from "../../../types/product.type";
import CommonBtn from "../CommonBtn";

import { discountCalculator } from "../../../utils/product.utils";
import { FaArrowRight } from "react-icons/fa6";

/**
 * TODO:
 * 1. Make a reusable function for updating wishlist and shopping cart in both ProductCard and FeatureProductLargeCard
 * 1. Make total feedbacks dynamic
 */

const FeatureProductLargeCard = ({ product }: { product: TProduct }) => {
  return (
    <Row className="shadow-lg rounded-md overflow-hidden bg-white h-full">
      <Col
        span={24}
        className="space-y-3 bg-warning text-center flex flex-col justify-center items-center p-4"
      >
        <p className="text-[#BE4646] font-bold ">Mobile & Accessories</p>
        <h4 className="text-3xl text-grayBlack">{discountCalculator(product)} % Discount</h4>
        <p className="font-semibold">For all ellectronics products</p>
        <div>
          <span>Offers ends in: </span>
          <Tag
            color="#ffffff"
            style={{ color: "#000000", fontWeight: "600", fontSize: "1rem" }}
          >
            Ends of Ramadan
          </Tag>
        </div>
        <div className="w-2/3 mx-auto">
          <CommonBtn size="large">
            Shop Now <FaArrowRight />
          </CommonBtn>
        </div>
      </Col>
      <Col
        span={24}
        className="relative bg-warning"
      >
        <img
          className="w-full h-full"
          src={product?.images[2]}
          alt=""
        />
      </Col>
    </Row>
  );
};

export default FeatureProductLargeCard;
