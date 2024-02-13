import { Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeProduct, setProducts } from "../../redux/features/productManagement/product.Slice";

type TQuantitySelectorProps = {
  productId: string;
};

const QuantitySelector = ({ productId }: TQuantitySelectorProps) => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const productQuantity = products?.filter((product) => product === productId).length;

  return (
    <div className="w-16 md:w-20">
      <Tag className="grid grid-cols-4 items-center justify-center text-center">
        <span
          onClick={() => dispatch(removeProduct(productId))}
          style={{ borderRight: "1px solid #5f6c72", padding: "0.3rem 0" }}
          className="cursor-pointer col-span-1"
        >
          -
        </span>{" "}
        <span className="col-span-2">{productQuantity}</span>
        <p
          onClick={() => dispatch(setProducts(productId))}
          style={{ borderLeft: "1px solid #5f6c72", padding: "0.3rem 0" }}
          className="cursor-pointer col-span-1 text-center"
        >
          +
        </p>
      </Tag>
    </div>
  );
};

export default QuantitySelector;
