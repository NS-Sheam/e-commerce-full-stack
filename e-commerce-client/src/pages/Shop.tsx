import { Checkbox, Col, InputNumber, Row } from "antd";
import { useGetCategoriesQuery } from "../redux/features/productManagement/productManagement.api";
import { useState } from "react";

type TPriceRange = {
  minPrice: number | null;
  maxPrice: number | null;
};

const Shop = () => {
  const { data: cData, isLoading: isCLoading, isFetching: isCFetching } = useGetCategoriesQuery(undefined);
  const [priceRange, setPriceRange] = useState<TPriceRange>({
    minPrice: 0,
    maxPrice: null,
  });

  if (isCLoading || isCFetching) {
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

  const handlePriceRangeClick = (min: number | null, max: number | null) => {
    setPriceRange({ minPrice: min, maxPrice: max });
  };
  console.log(priceRange);

  const isAllPriceSelected = priceRange.minPrice === 0 && priceRange.maxPrice === null;

  return (
    <Row>
      {/* Filter section  */}
      <Col span={6}>
        <div>
          <h3>Category</h3>
          <ul>
            {cData?.map((category) => (
              <li key={category._id}>
                <Checkbox>{category.name}</Checkbox>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Price Range</h3>
          <div className="flex justify-start items-center gap-2">
            <InputNumber
              placeholder="Min Price"
              onChange={(value) => setPriceRange({ ...priceRange, minPrice: value ? value : null })}
              value={priceRange.minPrice}
            />
            <InputNumber
              placeholder="Max Price"
              onChange={(value) => setPriceRange({ ...priceRange, maxPrice: value ? value : null })}
              value={priceRange.maxPrice}
            />
          </div>
          <ul>
            {priceRangeTexts.map(({ text, min, max }, index) => (
              <li
                key={index}
                className="flex justify-start items-center gap-2"
                onClick={() => handlePriceRangeClick(min, max)}
              >
                <div
                  style={{
                    border: isAllPriceSelected
                      ? text === "All Price"
                        ? "2px solid #fa8232"
                        : "1px solid #000000"
                      : priceRange.minPrice === min && priceRange.maxPrice === max
                      ? "2px solid #fa8232"
                      : "1px solid #000000",
                  }}
                  className="h-4 w-4 rounded-full bg-white"
                ></div>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Shop;
