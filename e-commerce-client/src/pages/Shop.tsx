import { Col, Row, Select } from "antd";
import { useGetCategoriesQuery, useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import { useState } from "react";
import CategoryFilter from "../components/Shop/CategoryFilter";
import PriceFilter from "../components/Shop/PriceFilter";
import BrandFilter from "../components/Shop/BrandFilter";
import PopularTag from "../components/Shop/PopularTag";

import "../styles/shop.css";
import ShopCardsSide from "../components/Shop/ShopCardsSide";
import { TMeta, TQueryParams } from "../types";
import ShopProductLargeCard from "../components/Shop/ShopProductLargeCard";
import ActiveFilter from "../components/Shop/ActiveFilter";
import ShopSearchBar from "../components/Shop/ShopSearchBar";
import ShopPagination from "../components/Shop/ShopPagination";
import { RxCross2 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import LoadingComponent from "../components/LoadingComponent";

type TPriceRange = {
  minPrice: number | null;
  maxPrice: number | null;
};

const Shop = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const [brands, setBrands] = useState<string[]>([]);
  const { data: pData, isLoading: pIsLoading, isFetching: pIsFetching } = useGetProductsQuery(undefined);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [meta, setMeta] = useState<TMeta>();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [sort, setSort] = useState<string>("price");
  const [showFilter, setShowFilter] = useState(false);
  const { data: cData, isLoading: isCLoading, isFetching: isCFetching } = useGetCategoriesQuery(undefined);
  const searchQuery: TQueryParams[] = [
    {
      name: "limit",
      value: 20 + "",
    },
    {
      name: "page",
      value: page + "",
    },
    {
      name: "sort",
      value: sort,
    },
  ];

  if (brands.length > 0) {
    searchQuery.push({
      name: "brand",
      value: brands.join(","),
    });
  }
  // console.log("brands", brands);

  if (categories.length > 0) {
    searchQuery.push({
      name: "category",
      value: categories.join(","),
    });
  }
  if (searchTerm) {
    searchQuery.push({
      name: "searchTerm",
      value: searchTerm,
    });
  }

  const [priceRange, setPriceRange] = useState<TPriceRange>({
    minPrice: 0,
    maxPrice: null,
  });

  if (priceRange.minPrice) {
    searchQuery.push({
      name: "minPrice",
      value: priceRange.minPrice + "",
    });
  }
  if (priceRange.maxPrice) {
    searchQuery.push({
      name: "maxPrice",
      value: priceRange.maxPrice + "",
    });
  }

  if (isCLoading || isCFetching || pIsLoading || pIsFetching) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <LoadingComponent />
      </div>
    );
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
      className="w-full inner-container py-4 relative"
    >
      {/* Filter section  */}
      <Col
        span={24}
        md={{ span: 6 }}
        className={`bg-white space-y-3 absolute md:static ${
          !showFilter ? "hidden" : "block"
        } md:block top-0 left-0 right-0 z-10`}
      >
        <p
          onClick={() => setShowFilter(false)}
          className="text-white bg-orange p-1 flex md:hidden items-center justify-center rounded-full text-xl absolute top-3 right-3"
        >
          <RxCross2 />
        </p>
        <CategoryFilter
          categories={cData || []}
          setter={setCategories}
          pageSetter={setPage}
        />
        <PriceFilter
          priceRange={priceRange}
          setter={setPriceRange}
          priceRangeTexts={priceRangeTexts}
          isAllPriceSelected={isAllPriceSelected}
          pageSetter={setPage}
        />
        <BrandFilter
          setter={setBrands}
          pageSetter={setPage}
        />
        <PopularTag
          setSearchTerm={setSearchTerm}
          setPage={setPage}
        />
        <ShopProductLargeCard product={pData?.data && pData?.data[0]} />
      </Col>
      <Col
        span={24}
        md={{ span: 18 }}
        className="bg-white space-y-4 h-full"
      >
        {/* Search section  */}
        <Row
          gutter={[16, 16]}
          justify="space-between"
        >
          <ShopSearchBar
            placeholder="Search for products"
            setSearchTerm={setSearchTerm}
          />
          <Col
            span={24}
            md={{ span: 6 }}
          >
            <Row
              gutter={[4, 4]}
              align="middle"
              justify="space-between"
            >
              <Col span={4}>
                <CiFilter
                  onClick={() => setShowFilter(!showFilter)}
                  className="text-orange text-4xl font-bold md:hidden"
                />
              </Col>

              <Col span={20}>
                <Select
                  className="w-full h-12"
                  defaultValue="featured"
                  onChange={(value) => {
                    value === "price-asc"
                      ? setSort("price")
                      : value === "price-desc"
                      ? setSort("-price")
                      : value === "newest"
                      ? setSort("-createdAt")
                      : setSort("createdAt");
                  }}
                  options={[
                    { value: "featured", label: "Featured" },
                    { value: "newest", label: "Newest" },
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                  ]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Filter show section  */}
        <Row
          gutter={[4, 4]}
          className="p-4 bg-[#F2F4F5] rounded-md"
        >
          <ActiveFilter
            categories={categories}
            brands={brands}
            setCategories={setCategories}
            setBrands={setBrands}
          />
          <Col
            span={24}
            md={{ span: 6 }}
          >
            <p className="text-grayBlack text-right">
              <span className="font-bold">{meta?.total}</span> Results Found
            </p>
          </Col>
        </Row>
        {/* Product section  */}
        <ShopCardsSide
          setMeta={setMeta}
          searchQuery={searchQuery}
        />
        {/* Pagination section */}
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
        >
          <ShopPagination
            page={page}
            setPage={setPage}
            meta={meta!}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default Shop;
