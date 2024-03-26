import { TProduct } from "../types/product.types";

export const discountCalculator = (product: TProduct) => {
  const { price, discount } = product || {};

  return Math.ceil((discount * 100) / (price + discount)) || 0;
};
export const sortByDiscount = (products: TProduct[]) => {
  return products?.sort((a, b) => discountCalculator(a) - discountCalculator(b)).reverse();
};
