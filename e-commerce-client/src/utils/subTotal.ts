import { TProduct } from "../types/product.types";

export const subTotalFn = (products: string[], productData: TProduct[]) => {
  let total = 0;
  let totalDiscount = 0;
  products?.forEach((product: string) => {
    const item = productData && productData.length && productData?.find((p) => p._id === product);

    total += item ? item.price : 0;
    totalDiscount += item ? item.discount : 0;
  });
  return {
    total,
    totalDiscount,
  };
};
