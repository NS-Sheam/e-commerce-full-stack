import { Col, Row } from "antd";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import { TProduct } from "../../../types/product.type";

const BannerCards = ({ productData }: { productData: TProduct[] }) => {
  return (
    <Row>
      <Col span={24}>
        <Row className="bg-grayBlack p-2 rounded-sm">
          <Col
            span={12}
            className="space-y-4 "
          >
            <small className="uppercase text-yellow-400 font-semibold"> Summer Sale</small>
            <h3 className="text-2xl font-bold text-white">{productData[0]?.name}</h3>
            <div className="w-36">
              <CommonBtn>
                Shop Now <FaArrowRight className="ml-2" />
              </CommonBtn>
            </div>
          </Col>
          <Col
            span={12}
            className="space-y-4"
          >
            <div className="w-44 h-44">
              <img
                className=" w-full h-full"
                src={productData[0].images[0]}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row className="bg-grayWhite2 p-2 rounded-sm mt-4">
          <Col
            span={12}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-grayBlack">{productData[1]?.name}</h3>
            <p className="uppercase text-[#2DA5F3] font-bold text-xl">${productData[1]?.price} USD</p>
            <div className="w-36">
              <CommonBtn>
                Shop Now <FaArrowRight className="ml-2" />
              </CommonBtn>
            </div>
          </Col>
          <Col
            span={12}
            className="space-y-4"
          >
            <div className="w-44 h-44">
              <img
                className=" w-full h-full"
                src={productData[1].images[0]}
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
