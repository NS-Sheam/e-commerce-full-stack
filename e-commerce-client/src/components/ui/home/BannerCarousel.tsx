import { Col, Row } from "antd";
import { discountCalculator, truncateString } from "../../../utils/product.utils";
import { TProduct } from "../../../types/product.types";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import "../../../styles/bannerCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Thumbs } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const BannerCarousel = ({ productData }: { productData: TProduct[] }) => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="bg-grayWhite2 h-full">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay, Thumbs]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper bg-black h-full"
      >
        {productData?.map((product) => (
          <SwiperSlide key={product._id}>
            <Row
              justify="center"
              align="middle"
              className="bg-grayWhite2 p-14 rounded-sm h-full"
              gutter={[16, 16]}
            >
              <Col
                span={12}
                className="space-y-2 md:space-y-3"
              >
                <small className="text-[#2DA5F3] font-bold flex items-center justify-center gap-1 text-xs md:text-xl uppercase">
                  <hr className="w-10 h-[3px] bg-[#2DA5F3]" />
                  your best deal
                </small>
                <h1 className="text-base md:text-4xl font-bold text-grayBlack">{truncateString(product?.name, 5)}</h1>
                <p className="text-grayBlack text-xs md:text-xl">
                  Save upto {discountCalculator(product)}% off and get free shipping on all orders
                </p>
                <div className=" w-28 md:w-48">
                  <CommonBtn
                    size={(isSmallDevice && "small") || "large"}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <span className="text-xs md:text-base">
                      Shop Now <FaArrowRight className="ml-2" />
                    </span>
                  </CommonBtn>
                </div>
              </Col>
              <Col span={12}>
                <div className="w-32 md:w-80 h-32 md:h-80 ">
                  <img
                    className="  object-contain w-full h-full "
                    src={product?.images[0]}
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
