import { Col, Row } from "antd";
import { TProduct } from "../../types/product.type";
import ProductCard from "../ui/ProductCard";
import BestDealLongCard from "../ui/home/BestDealLongCard";

/**
 * FIXME:
 * 1. Have to fixed py for the all home section same
 */

const BestDeal = ({ productData }: { productData: TProduct[] }) => {
  return (
    <Row
      gutter={[16, 16]}
      className="py-10 px-4"
    >
      <Col
        span={24}
        md={{ span: 6 }}
      >
        <BestDealLongCard product={productData[0]} />
      </Col>
      <Col
        span={24}
        md={{ span: 18 }}
      >
        <Row gutter={[16, 16]}>
          {productData.slice(0, 8).map((product) => (
            <Col
              key={product._id}
              span={12}
              md={{ span: 6 }}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default BestDeal;
