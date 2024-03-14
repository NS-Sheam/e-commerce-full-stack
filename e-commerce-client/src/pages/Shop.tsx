import { Checkbox, Col, Input, InputNumber, Row, Select, Tag } from "antd";
import { useGetCategoriesQuery, useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import { useState } from "react";
import CategoryFilter from "../components/Shop/CategoryFilter";
import PriceFilter from "../components/Shop/PriceFilter";
import BrandFilter from "../components/Shop/BrandFilter";
import PopularTag from "../components/Shop/PopularTag";
import ShopProductLargeCard from "../components/Shop/ShopProductLargeCard";
import { FaArrowLeft, FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
import ProductCard from "../components/ui/ProductCard";
import "../styles/shop.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type TPriceRange = {
  minPrice: number | null;
  maxPrice: number | null;
};

const Shop = () => {
  const { data: cData, isLoading: isCLoading, isFetching: isCFetching } = useGetCategoriesQuery(undefined);
  const { data: pData, isLoading: isPLoading, isFetching: isPFetching } = useGetProductsQuery(undefined);

  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const products = pData?.data;
  const [priceRange, setPriceRange] = useState<TPriceRange>({
    minPrice: 0,
    maxPrice: null,
  });

  if (isCLoading || isCFetching || isPLoading || isPFetching) {
    return <div>Loading...</div>;
  }

  const priceRangeTexts = [
    { text: "All Price", min: 0, max: null },
    { text: "0-100", min: 0, max: 100 },
    { text: "100-250", min: 100, max: 250 },
    { text: "250-500", min: 250, max: 500 },
    { text: "500-1000", min: 500, max: 1000 },
    { text: "1000-2000", min: 1000, max: 2000 },
    { text: "2000-5000", min: 2000, max: 5000 },
    { text: "5000-10000", min: 5000, max: 10000 },
    { text: "10000-", min: 10000, max: null },
  ];

  const isAllPriceSelected = priceRange.minPrice === 0 && priceRange.maxPrice === null;

  return (
    <Row
      gutter={[16, 16]}
      className="w-full inner-container pt-4"
    >
      {/* Filter section  */}
      <Col
        span={6}
        className="bg-white space-y-3"
      >
        <CategoryFilter
          categories={cData || []}
          setter={setCategories}
        />
        <PriceFilter
          priceRange={priceRange}
          setter={setPriceRange}
          priceRangeTexts={priceRangeTexts}
          isAllPriceSelected={isAllPriceSelected}
        />
        <BrandFilter
          products={products || []}
          setter={setBrands}
        />
        <PopularTag />
        <ShopProductLargeCard product={products![1]} />
      </Col>
      <Col
        span={18}
        className="bg-white space-y-2 h-full"
      >
        {/* Search section  */}
        <Row
          gutter={[16, 16]}
          justify="space-between"
        >
          <Col
            span={12}
            className="shop-searchbar relative w-full"
          >
            <Input
              type="text"
              placeholder="Enter your search keyword here..."
              className="w-full h-12 px-4 rounded-sm"
            />
            <div className="absolute inset-y-0 right-0 px-6 flex items-center bg-slate-200 cursor-pointer">
              <FaMagnifyingGlass className={` text-xl lg:text-2xl text-gray`} />
            </div>
          </Col>
          <Col span={6}>
            <Select
              className="w-full h-12"
              defaultValue="featured"
              onChange={(value) => console.log(value)}
              options={[
                { value: "featured", label: "Featured" },
                { value: "newest", label: "Newest" },
                { value: "price-asc", label: "Price: Low to High" },
                { value: "price-desc", label: "Price: High to Low" },
              ]}
            />
          </Col>
        </Row>
        {/* Filter show section  */}
        <Row
          gutter={[16, 16]}
          className="py-4 bg-[#F2F4F5] rounded-md"
        >
          <Col span={18}>
            <p>
              Active Filters:
              <span className="text-primary">Clear All</span>
              <span className="text-primary">Clear All</span>
            </p>
          </Col>
          <Col span={6}>
            <p className="text-grayBlack">
              <span className="font-bold">10000</span> Results Found
            </p>
          </Col>
        </Row>
        <div
          style={{
            border: "1px solid #e5e5e5",
            padding: "1rem",
          }}
          className="h-full"
        >
          <Row
            gutter={[16, 16]}
            justify={"start"}
            align={"top"}
          >
            {products?.map((product) => (
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
        </div>
        {/* Pagination section */}
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
        >
          <Col
            span={24}
            className="flex justify-center items-center gap-3"
          >
            <div
              style={{
                border: "2px solid #fa8232",
                borderRadius: "100%",
              }}
              className="flex justify-center items-center cursor-pointer"
            >
              <FaArrowLeft className="text-orange text-3xl p-1" />
            </div>

            {Array.from({ length: pData?.meta?.page as number }).map((_, index) => (
              <Tag
                key={index}
                className="cursor-pointer text-2xl"
                style={{
                  border: "1px solid #000000",
                  borderRadius: "100%",
                }}
              >
                {index + 1}
              </Tag>
            ))}
            <div
              style={{
                border: "2px solid #fa8232",
                borderRadius: "100%",
              }}
              className="flex justify-center items-center cursor-pointer"
            >
              <FaArrowRight className="text-orange text-3xl p-1" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Shop;
