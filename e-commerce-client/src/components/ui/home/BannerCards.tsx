import { Col, Row } from "antd";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import { TProduct } from "../../../types/product.types";
import { useMediaQuery } from "react-responsive";
import { truncateString } from "../../../utils/product.utils";

/**
 * FIXME:
 * 1. Have to fix both cards down padding
 */

const BannerCards = ({ productData }: { productData: TProduct[] }) => {
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Row
      gutter={[8, 22]}
      className="px-1 md:px-0  py-2"
    >
      <Col
        span={12}
        md={{ span: 24 }}
      >
        <Row
          gutter={[0, 16]}
          className="bg-grayBlack p-3 rounded-sm"
        >
          <Col
            span={24}
            md={{ span: 12 }}
            className="space-y-2 md:space-y-4 "
          >
            <small className="text-[8px] md:text-base uppercase text-yellow-400 font-semibold"> Summer Sale</small>
            <h3 className="text-sm md:text-2xl font-bold text-white">{truncateString(productData?.[0]?.name, 5)}</h3>
            <div className="w-24 md:w-36">
              <CommonBtn size={(isSmallDevice && "small") || "large"}>
                <span className="text-xs md:text-base">
                  Shop Now <FaArrowRight className="ml-2" />
                </span>
              </CommonBtn>
            </div>
          </Col>
          <Col
            span={24}
            md={{ span: 12 }}
            className="space-y-4"
          >
            <div className="w-full md:w-44 h-32 md:h-44 mx-auto">
              <img
                className=" w-full h-full"
                src={productData?.[0]?.images[0]}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col
        span={12}
        md={{ span: 24 }}
      >
        <Row
          gutter={[0, 16]}
          className="bg-grayWhite2 p-3 rounded-sm "
        >
          <Col
            span={24}
            md={{ span: 12 }}
            className="space-y-2 md:space-y-4"
          >
            <h3 className="text-sm md:text-2xl text-grayBlack">{truncateString(productData?.[1]?.name, 5)}</h3>
            <p className="uppercase text-[#2DA5F3] font-bold text-sm md:text-xl">${productData?.[1]?.price} USD</p>
            <div className="w-24 md:w-36">
              <CommonBtn size={(isSmallDevice && "small") || "large"}>
                <span className="text-xs md:text-base">
                  Shop Now <FaArrowRight className="ml-2" />
                </span>
              </CommonBtn>
            </div>
          </Col>
          <Col
            span={24}
            md={{ span: 12 }}
            className="space-y-4"
          >
            <div className="w-full md:w-44 h-32 md:h-44 mx-auto">
              <img
                className=" w-full h-full"
                src={productData?.[1]?.images[0]}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BannerCards;
