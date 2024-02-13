import { Tag } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeProduct, setProducts } from "../../redux/features/productManagement/product.Slice";

type TQuantitySelectorProps = {
  productId: string;
};

const QuantitySelector = ({ productId }: TQuantitySelectorProps) => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const productQuantity = products?.filter((product) => product === productId).length || 0;

  return (
    <Tag
      className="grid grid-cols-4 items-center justify-center text-center"
      style={{ fontWeight: "600", fontSize: "1.2rem", width: "100%" }}
    >
      <span
        onClick={() => dispatch(removeProduct(productId))}
        style={{ fontSize: "1.5rem", borderRight: "1px solid #5f6c72", padding: "0.3rem 0" }}
        className="cursor-pointer col-span-1"
      >
        -
      </span>{" "}
      <span className="col-span-2">{productQuantity}</span>
      <span
        onClick={() => dispatch(setProducts(productId))}
        style={{ fontSize: "1.5rem", borderLeft: "1px solid #5f6c72", padding: "0.3rem 0" }}
        className="cursor-pointer col-span-1"
      >
        +
      </span>
    </Tag>
  );
};

export default QuantitySelector;
