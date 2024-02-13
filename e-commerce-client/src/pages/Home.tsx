import { useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import Banner from "../components/layout/Banner";
import { sortByDiscount } from "../utils/product.utils";
import { TProduct } from "../types/product.type";
import { Col, Row } from "antd";
import ProductCard from "../components/ui/ProductCard";
import CommonBtn from "../components/ui/CommonBtn";

const Home = () => {
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(undefined);

  const productData = sortByDiscount(products?.data?.map((product) => product) as TProduct[]);

  return (
    <div>
      {/* Banner section  */}
      <Banner />
      {/* Best Deal  */}
      <Row
        gutter={[16, 16]}
        className="py-14"
      >
        <Col span={6}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="h-full">
                <img
                  className="w-full h-full"
                  src={productData[0]?.images[0]}
                  alt=""
                />
              </div>
            </Col>
            <Col span={24}>
              <h4>Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...</h4>
              <p>$442.12</p>
              <p>Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.</p>
              <CommonBtn size="large">Shop Now</CommonBtn>
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>
            {productData.slice(0, 8).map((product) => (
              <Col
                key={product._id}
                span={6}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
