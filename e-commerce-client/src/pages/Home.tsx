import { useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";
import Banner from "../components/layout/Banner";
import { sortByDiscount } from "../utils/product.utils";
import { TProduct } from "../types/product.type";

const Home = () => {
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(undefined);

  const productData = sortByDiscount(products?.data?.map((product) => product) as TProduct[]);

  return (
    <div>
      {/* Banner section  */}
      <Banner />
      {/* Product section  */}
    </div>
  );
};

export default Home;
