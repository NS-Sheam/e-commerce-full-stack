import img1 from "../../../assets/images/air-jordan1.jpeg";
import img2 from "../../../assets/images/air-jordan2.jpg";
import img3 from "../../../assets/images/shoe.jpeg";
import img4 from "../../../assets/images/tab1.jpg";
import img5 from "../../../assets/images/tab3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import { Card } from "antd";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../../../styles/ShopWithCategories.css";
import { useMediaQuery } from "react-responsive";

const ShopWithCategories = () => {
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });
  const isMediumDevice = useMediaQuery({ query: "(max-width: 1024px)" });
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: img1,
    },
    {
      id: 2,
      name: "Clothing",
      image: img2,
    },
    {
      id: 3,
      name: "Shoes",
      image: img3,
    },
    {
      id: 4,
      name: "Furniture",
      image: img4,
    },
    {
      id: 5,
      name: "Books",
      image: img5,
    },
    {
      id: 6,
      name: "Jewelry",
      image: img1,
    },
    {
      id: 7,
      name: "Toys",
      image: img2,
    },
    {
      id: 8,
      name: "Beauty",
      image: img3,
    },
    {
      id: 9,
      name: "Sports",
      image: img4,
    },
  ];

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
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
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
