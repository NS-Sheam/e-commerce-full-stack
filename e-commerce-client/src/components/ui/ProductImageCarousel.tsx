import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TProduct } from "../../types/product.types";
import { Col, Flex, Row } from "antd";
import { GlassMagnifier } from "react-image-magnifiers";
import Magnifier from "react-magnifier";

const ProductImageCarousel = ({ product }: { product: TProduct }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const arrowButtonStyle =
    "p-1 flex justify-center items-center rounded-full text-white text-xl absolute top-1/2 transform -translate-y-1/2";

  return (
    <Flex
      gap={4}
      //   vertical="center"
      vertical={true}
      justify="center"
    >
      <Col
        span={24}
        className=" relative"
      >
        {/* FIXME: Zoom in second no image is not working. have to fix it. It is possible for image resulation */}
        <div className="flex justify-center items-center max-h-80 h-80 md:h-96 product-image-carousel-left ">
          {/* <GlassMagnifier
            style={{ width: "100%", height: "100%" }}
            imageSrc={product?.images[sliderIndex]}
            imageAlt={product.name}
            largeImageSrc={product?.images[sliderIndex]}
            magnifierSize="30%"
            magnifierBorderSize={1}
            magnifierBorderColor="rgba(0,0,0,0.5)"
            square={true}
            allowOverflow={true}
            cursorStyle="none"
            className="w-full h-full"
          /> */}
          <Magnifier
            className="w-full h-full object-contain"
            // height={300}
            src={product?.images[sliderIndex]}
            // width={350}
            mgWidth={100}
            mgHeight={100}
            mgShape="square"
            mgShowOverflow={false}
            mgBorderWidth={1}
          />
          {/* <img
            src={product?.images[sliderIndex]}
            className="w-full h-full object-contain"
            alt=""
          /> */}
        </div>
      </Col>
      <Col
        span={24}
        className="w-full"
      >
        <Row
          gutter={8}
          justify="center"
          className="relative"
        >
          {product?.images.map((image, index) => (
            <Col
              key={index}
              span={6}
            >
              <img
                key={index}
                src={image}
                alt={product.name}
                style={{ border: sliderIndex === index ? "2px solid #2DA5F3" : "", padding: "2px", height: "5rem" }}
                className={`cursor-pointer w-full h-full object-contain ${sliderIndex === index ? "" : ""}`}
                onClick={() => setSliderIndex(index)}
              />
            </Col>
          ))}
          {/* FIXME:Have to fix arrow position for many items  */}
          <span
            style={{ backgroundColor: "#fa8232" }}
            className={arrowButtonStyle + " -left-10"}
            onClick={() => setSliderIndex(sliderIndex - 1 < 0 ? product.images.length - 1 : sliderIndex - 1)}
          >
            <FaArrowLeft />
          </span>
          <span
            style={{ backgroundColor: "#fa8232" }}
            className={arrowButtonStyle + " -right-10"}
            onClick={() => setSliderIndex(sliderIndex + 1 > product.images.length - 1 ? 0 : sliderIndex + 1)}
          >
            <FaArrowRight />
          </span>
        </Row>
      </Col>
    </Flex>
  );
};

export default ProductImageCarousel;
