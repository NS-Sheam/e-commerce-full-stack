import { Checkbox, Col, InputNumber, Row, Tag } from "antd";
import { useGetCategoriesQuery, useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import { useState } from "react";
import CategoryFilter from "../components/Shop/CategoryFilter";
import PriceFilter from "../components/Shop/PriceFilter";
import BrandFilter from "../components/Shop/BrandFilter";

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
        <div>
          <h3 className="text-xl font-bold">Popular Tag</h3>
          <div>
            {[
              "Game",
              "Phone",
              "Laptop",
              "Camera",
              "Watch",
              "Headphone",
              "TV",
              "Smartphone",
              "Computer",
              "Camera",
              "Watch",
              "Headphone",
              "TV",
              "Smartphone",
            ].map((item, index) => {
              return (
                <Tag
                  key={index}
                  color="default"
                  className="m-1 hover:border-orange hover:text-orange cursor-pointer"
                >
                  {item}
                </Tag>
              );
            })}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Shop;
