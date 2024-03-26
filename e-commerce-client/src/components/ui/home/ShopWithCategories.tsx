import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import { Card } from "antd";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../../../styles/ShopWithCategories.css";
import { useMediaQuery } from "react-responsive";
import { useGetCategoriesQuery } from "../../../redux/features/productManagement/productManagement.api";

const ShopWithCategories = () => {
  const { data: categories, isLoading: isCLoading, isFetching: isCFetching } = useGetCategoriesQuery(undefined);
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });
  const isMediumDevice = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className="space-y-4 relative overflow-hidden ">
      <h3 className="text-grayBlack font-bold text-xl md:text-2xl text-center">Shop by Categories</h3>
      <Swiper
        slidesPerView={isSmallDevice ? 2 : isMediumDevice ? 3 : 5}
        spaceBetween={10}
        freeMode={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, FreeMode, Navigation, Pagination]}
        className="mySwiper"
      >
        {categories?.map((category) => (
          <SwiperSlide key={category?._id}>
            <Card
              className="flex flex-col justify-center items-center"
              style={{ width: isSmallDevice ? "10rem" : "14rem" }}
            >
              <img
                alt={category.name}
                src={category.image}
                style={{ width: isSmallDevice ? "8rem" : "12rem", height: isSmallDevice ? "8rem" : "12rem" }}
              />
              <h3 className="text-[#191C1F] font-medium text-center">{category.name}</h3>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next bg-orange rounded-full flex items-center justify-center">
        <FaArrowRight />
      </div>
      <div className="swiper-button-prev">
        <FaArrowLeft />
      </div>
    </div>
  );
};

export default ShopWithCategories;
