import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/productManagement/productManagement.api";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: pIsLoading } = useGetSingleProductQuery(id || "");
  console.log(product, pIsLoading);

  return (
    <div>
      <h1>ProductDetails</h1>
    </div>
  );
};

export default ProductDetails;
