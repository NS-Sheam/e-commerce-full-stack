import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/productManagement/productManagement.api";
import { Col, Row } from "antd";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ProductImageCarousel from "../components/ui/ProductImageCarousel";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: pIsLoading } = useGetSingleProductQuery(id || "");
  const [sliderIndex, setSliderIndex] = useState(0);

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
            {/* Display the first image outside the slider */}
            {/* <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "100%" }}
            /> */}
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
