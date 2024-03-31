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
/**
 * TODO:
 * 1. Handle product loading
 */
const Home = () => {
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(undefined);

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
      <HomeAds2 product={productData?.[1]} />
      <Subscribe />
    </div>
  );
};

export default Home;
