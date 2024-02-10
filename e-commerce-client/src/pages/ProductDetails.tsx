import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/productManagement/productManagement.api";
import { Col, Flex, Row, Spin } from "antd";

import ProductImageCarousel from "../components/ui/ProductImageCarousel";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: pIsLoading } = useGetSingleProductQuery(id || "");

  if (pIsLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        gap="middle"
        style={{ minHeight: "100vh" }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <div className="inner-container p-4">
      {product && (
        <Row gutter={16}>
          <Col
            span={24}
            md={{ span: 12 }}
          >
            <Row
              gutter={16}
              justify="center"
            >
              <Col span={16}>
                {/* Carousel Component  */}
                <ProductImageCarousel product={product} />
              </Col>
            </Row>
          </Col>
          <Col
            span={24}
            md={{ span: 12 }}
          >
            <h1 className="">{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductDetails;
