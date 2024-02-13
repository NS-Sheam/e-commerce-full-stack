import { Col, Row } from "antd";
import { useGetProductsQuery } from "../../redux/features/productManagement/productManagement.api";
import { discountCalculator, sortByDiscount } from "../../utils/product.utils";
import { TProduct } from "../../types/product.type";
import CommonBtn from "../ui/CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import BannerCarousel from "../ui/home/BannerCarousel";
import BannerCards from "../ui/home/BannerCards";

const Banner = () => {
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(undefined);

  if (productIsLoading) {
    return <div>Loading...</div>;
  }

  const productData = sortByDiscount(products?.data?.map((product) => product) as TProduct[]);
  return (
    <Row gutter={16}>
      <Col
        span={24}
        md={{ span: 16 }}
      >
        <BannerCarousel productData={productData} />
      </Col>
      <Col
        span={24}
        md={{ span: 8 }}
      >
        <BannerCards productData={productData} />
      </Col>
    </Row>
  );
};

export default Banner;
