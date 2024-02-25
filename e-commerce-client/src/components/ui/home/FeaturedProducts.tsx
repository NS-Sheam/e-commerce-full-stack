import { Col, Row } from "antd";
import ProductCard from "../ProductCard";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { TProduct } from "../../../types/product.type";
import FeatureProductLargeCard from "./FeatureProductLargeCard";

const FeaturedProducts = ({ productData }: { productData: TProduct[] }) => {
  const [category, setCategory] = useState("All Products");
  const categories = ["All Products", "Electronics", "Fashion", "Home & Kitchen", "Health & Beauty"];

  return (
    <Row
      gutter={[16, 16]}
      className="py-10 px-4"
    >
      <Col
        span={24}
        md={{ span: 6 }}
      >
        <FeatureProductLargeCard product={productData?.[3]} />
      </Col>
      <Col
        span={24}
        md={{ span: 18 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row
              justify="space-between"
              align="middle"
            >
              <Col
                span={24}
                md={{ span: 4 }}
              >
                <h3>Featured Products</h3>
              </Col>
              <Col
                span={24}
                md={{ span: 20 }}
              >
                <Row
                  justify="end"
                  align="middle"
                >
                  {categories.map((item) => (
                    <Col
                      onClick={() => {
                        setCategory(item);
                      }}
                      span={6}
                      md={{ span: 4 }}
                      className="border-b-4 border-orange "
                    >
                      <p
                        className={`text-center text-xs font-semibold text-grayBlack py-2 cursor-pointer ${
                          item === category ? "bg-grayWhite" : ""
                        }`}
                      >
                        {item}
                      </p>
                      <hr className={`h-1 w-full bg-orange ${item === category ? "visible" : "hidden"}`} />
                    </Col>
                  ))}
                  <Col span={4}>
                    <p className="text-xs cursor-pointer text-orange font-semibold flex justify-center items-center gap-2">
                      Show all products <FaArrowRight />
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {productData?.slice(0, 7)?.map((product) => (
            <Col
              key={product._id}
              span={12}
              md={{ span: 6 }}
            >
              <ProductCard
                product={product}
                rating
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default FeaturedProducts;
