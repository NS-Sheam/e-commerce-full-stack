import { Col, Row, Tag } from "antd";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import { TProduct } from "../../../types/product.types";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../../../utils/product.utils";

/**
 * FIXME:
 * 1. Have to fix both cards down padding
 */

const HomeAds1 = ({ productData }: { productData: TProduct[] }) => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Row
      gutter={[8, 22]}
      className="px-1 md:px-0  py-2"
    >
      <Col
        span={24}
        md={{ span: 12 }}
      >
        <Row
          align="middle"
          gutter={[0, 16]}
          className="bg-grayWhite2 px-5 py-5 md:py-14 rounded-sm h-full"
        >
          <Col
            span={12}
            className="space-y-2 md:space-y-4"
          >
            <Tag
              className="text-xl font-bold px-2"
              color="#2DA5F3"
            >
              Introducing
            </Tag>
            <h3 className="text-xl md:text-3xl text-grayBlack">{truncateString(productData?.[2]?.name, 5)}</h3>
            <p className="text-gray md:text-xl font-semibold ">{truncateString(productData?.[2]?.description, 6)} </p>
            <div className="w-24 md:w-36">
              <CommonBtn
                onClick={() => navigate(`/product/${productData?.[2]._id}`)}
                size={(isSmallDevice && "small") || "large"}
              >
                <span className="text-xs md:text-base">
                  Shop Now <FaArrowRight className="ml-2" />
                </span>
              </CommonBtn>
            </div>
          </Col>
          <Col
            span={12}
            className="space-y-4"
          >
            <div className="w-32 md:w-60 h-32 md:h-60 mx-auto">
              <img
                className=" w-full h-full object-contain"
                src={productData?.[2]?.images[0]}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col
        span={24}
        md={{ span: 12 }}
        className="relative"
      >
        <div className="absolute h-14 md:h-28 w-14 md:w-28 rounded-full z-10 bg-[#2DA5F3] top-14 md:top-16 right-2 md:right-4 flex items-center justify-center">
          <span className="text-xs md:text-2xl font-bold text-white">${productData?.[1]?.price}</span>
        </div>
        <Row
          align="middle"
          gutter={[0, 16]}
          className="bg-grayBlack px-5 py-5 md:py-14 rounded-sm h-full"
        >
          <Col
            span={12}
            className="space-y-2 md:space-y-4 "
          >
            <Tag
              className="text-xl font-bold px-2 "
              style={{
                color: "#191C1F",
              }}
              color="#EFD33D"
            >
              Introducing
            </Tag>
            <h3 className="text-xl md:text-3xl font-bold text-white">{truncateString(productData?.[1]?.name, 5)}</h3>
            <p className="text-white md:text-xl font-semibold ">{truncateString(productData?.[1]?.description, 6)} </p>
            <div className="w-24 md:w-36">
              <CommonBtn
                onClick={() => navigate(`/product/${productData?.[1]._id}`)}
                size={(isSmallDevice && "small") || "large"}
              >
                <span className="text-xs md:text-base">
                  Shop Now <FaArrowRight className="ml-2" />
                </span>
              </CommonBtn>
            </div>
          </Col>
          <Col
            span={12}
            className="space-y-4"
          >
            <div className="w-32 md:w-60 h-32 md:h-60 mx-auto">
              <img
                className=" w-full h-full object-contain"
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

export default HomeAds1;
