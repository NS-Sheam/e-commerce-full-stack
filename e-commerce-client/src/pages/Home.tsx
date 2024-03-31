import { useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import Banner from "../components/layout/Banner";
import { sortByDiscount } from "../utils/product.utils";
import { TProduct } from "../types/product.types";
import BestDeal from "../components/layout/BestDeal";
import Features from "../components/ui/home/Features";
import ShopWithCategories from "../components/ui/home/ShopWithCategories";
import FeaturedProducts from "../components/ui/home/FeaturedProducts";
import HomeAds1 from "../components/ui/home/HomeAds1";
import ComputerAccessories from "../components/ui/home/ComputerAccessries";
import HomeAds2 from "../components/ui/home/HomeAds2";
import Subscribe from "../components/ui/home/Subscribe";
import LoadingComponent from "../components/LoadingComponent";
import { TQueryParams } from "../types";
import { useEffect, useState } from "react";
/**
 * TODO:
 * 1. Handle product loading
 */
const Home = () => {
  const [limit, setLimit] = useState(20);
  const searchQuery: TQueryParams[] = [
    {
      name: "limit",
      value: limit + "",
    },
    {
      name: "page",
      value: 1 + "",
    },
  ];
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(searchQuery);

  useEffect(() => {
    setLimit(products?.meta?.total || 20);
  }, [products]);
  const productData = sortByDiscount(products?.data?.map((product) => product) as TProduct[]);

  if (productIsLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="container overflow-hidden">
      {/* Banner section  */}
      <Banner />
      <Features />
      {/* Best Deal  */}
      <BestDeal productData={productData} />
      {/* Shop with categories  */}
      <ShopWithCategories />
      {/* Feature Products  */}
      <FeaturedProducts />
      {/* Home Ads 1 */}
      <HomeAds1 productData={productData} />
      {/* Comuter Accessories */}
      <ComputerAccessories />
      {/* Home Ads 2 */}
      <HomeAds2 />
      <Subscribe />
    </div>
  );
};

export default Home;
