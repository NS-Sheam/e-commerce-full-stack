import { Col, Row } from "antd";
import { discountCalculator } from "../../../utils/product.utils";
import { TProduct } from "../../../types/product.type";
import CommonBtn from "../CommonBtn";
import { FaArrowRight } from "react-icons/fa6";
import "../../../styles/bannerCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const BannerCarousel = ({ productData }: { productData: TProduct[] }) => {
  return (
    <div className="p-14 bg-grayWhite2">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        className="mySwiper bg-black"
      >
        {productData.map((product) => (
          <SwiperSlide key={product._id}>
            <Row
              className="bg-grayWhite2 p-2 rounded-sm"
              gutter={16}
            >
              <Col
                span={12}
                className="space-y-4"
              >
                <small className="text-[#2DA5F3] font-bold flex items-center justify-center gap-1 text-xl uppercase">
                  <hr className="w-10 h-[3px] bg-[#2DA5F3]" />
                  your best deal
                </small>
                <h1 className="text-4xl font-bold text-grayBlack">{product?.name}</h1>
                <p className="text-grayBlack text-xl">
                  Save upto {discountCalculator(product)}% off and get free shipping on all orders
                </p>
                <div className="w-48">
                  <CommonBtn>
                    Shop Now <FaArrowRight className="ml-2" />
                  </CommonBtn>
                </div>
              </Col>
              <Col span={12}>
                <div className="w-80 h-80">
                  <img
                    className=" w-full h-full"
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
