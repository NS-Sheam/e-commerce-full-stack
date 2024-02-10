import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/productManagement/productManagement.api";
import { Col, Row } from "antd";
import Slider from "react-slick";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: pIsLoading } = useGetSingleProductQuery(id || "");

  // Base URL for image paths
  const baseUrl = "/";

  // Settings for the slider
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={`${baseUrl}/abstract0${i + 1}.jpg`}
            alt={`abstract0${i + 1}`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Render the slider only when product data is available
  return (
    <div>
      {product && (
        <Row gutter={16}>
          <Col span={12}>
            <div className="slider-container">
              <Slider {...settings}>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/* Display the first image outside the slider */}
            {/* <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "100%" }}
            /> */}
          </Col>
          <Col span={12}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductDetails;
