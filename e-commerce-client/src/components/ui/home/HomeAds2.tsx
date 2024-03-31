import { Col, Row, Tag } from "antd";
import { TProduct } from "../../../types";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../../../utils/product.utils";
import { useGetProductsQuery } from "../../../redux/features/productManagement/productManagement.api";

const HomeAds2 = () => {
  const {
    data: pData,
    isLoading: isPLoading,
    isFetching: isPFetching,
  } = useGetProductsQuery([
    {
      name: "category",
      value: "Laptop",
    },
  ]);
  const product = pData?.data?.[0] as TProduct;
  const navigate = useNavigate();
  if (isPLoading || isPFetching) return null;
  return (
    <Row
      gutter={[8, 22]}
      justify="space-between"
      align="middle"
      className="bg-[#FFE7D6] p-16"
    >
      <Col
        span={24}
        md={{ span: 12 }}
        className="space-y-3 text-center md:text-left"
      >
        <Tag
          className="font-bold px-2 text-xl"
          color="#2DA5F3"
        >
          Save Up to ${product?.discount}
        </Tag>
        <h4 className="text-3xl md:text-5xl text-grayBlack">{truncateString(product?.name, 7)}</h4>
        <p className="font-semibold text-xl md:text-2xl">{truncateString(product?.description, 15)}</p>
        <div className=" w-full md:w-1/3">
          <CommonBtn
            onClick={() => navigate(`/product/${product?._id}`)}
            size="large"
          >
            Shop Now <FaArrowRight />
          </CommonBtn>
        </div>
      </Col>
      <Col
        span={24}
        md={{ span: 12 }}
        className="flex justify-center items-center w-full h-full"
      >
        <div className="w-72 h-72 relative">
          <div
            style={{
              border: "5px solid #ffffff",
            }}
            className="absolute bg-[#FFCEAD] w-20 md:w-28 h-20 md:h-28 rounded-full top-0  left-0 md:-left-16 flex justify-center items-center"
          >
            <span className="md:text-xl font-bold text-grayBlack">${product?.price}</span>
          </div>
          <img
            className="w-full h-full object-contain"
            src={product?.images[0]}
            alt=""
          />
        </div>
      </Col>
    </Row>
  );
};

export default HomeAds2;
