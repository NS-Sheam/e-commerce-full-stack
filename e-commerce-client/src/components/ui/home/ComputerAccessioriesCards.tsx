import { Col, Tag } from "antd";
import { TProduct } from "../../../types";
import { discountCalculator } from "../../../utils/product.utils";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";

const ComputerAccessioriesCards = ({ product }: { product: TProduct }) => {
  return (
    <>
      <Col
        span={24}
        className="space-y-3 bg-warning text-center flex flex-col justify-between items-center p-4"
      >
        <div className="w-3/4">
          <img
            className="w-full h-full"
            src={product?.images[0]}
            alt=""
          />
        </div>
        <h4 className="text-3xl text-grayBlack">{product.name}</h4>
        <p className="font-semibold">{product.description.slice(0, 60)}</p>
        <div>
          <span>Only For: </span>
          <Tag
            color="#ffffff"
            style={{ color: "#000000", fontWeight: "600", fontSize: "1rem" }}
          >
            {product.price} BDT
          </Tag>
        </div>
        <div className=" w-full">
          <CommonBtn size="large">
            Shop Now <FaArrowRight />
          </CommonBtn>
        </div>
      </Col>
      <Col
        span={24}
        className="bg-[#124261] text-center p-4 gap-2 flex flex-col items-center justify-between"
      >
        <Tag
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            border: "0",
            color: "#ffffff",
            padding: "0.3rem 1rem",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          summer sale
        </Tag>
        <h4 className="text-3xl text-white">{discountCalculator(product)} % Discount</h4>
        <p className="text-white text-center ">
          Only for <span className="text-warning">SmartPhone</span> products
        </p>
        <div className=" w-full ">
          <CommonBtn
            backgroundColor="#2DA5F3"
            size="large"
          >
            Shop Now <FaArrowRight />
          </CommonBtn>
        </div>
      </Col>
    </>
  );
};

export default ComputerAccessioriesCards;
