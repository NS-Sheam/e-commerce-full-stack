import { useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import Banner from "../components/layout/Banner";
import { sortByDiscount } from "../utils/product.utils";
import { TProduct } from "../types/product.type";
import BestDeal from "../components/layout/BestDeal";
import Features from "../components/ui/home/Features";
/**
 * TODO:
 * 1. Handle product loading
 */
const Home = () => {
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(undefined);

  const productData = sortByDiscount(products?.data?.map((product) => product) as TProduct[]);

  if (productIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Banner section  */}
      <Banner />
      <Features />
      {/* Best Deal  */}
      <BestDeal productData={productData} />
    </div>
  );
};

export default Home;
