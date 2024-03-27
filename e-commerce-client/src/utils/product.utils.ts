import { TProduct } from "../types/product.types";

export const discountCalculator = (product: TProduct) => {
  const { price, discount } = product || {};

  return Math.ceil((discount * 100) / (price + discount)) || 0;
};
export const sortByDiscount = (products: TProduct[]) => {
  return products?.sort((a, b) => discountCalculator(a) - discountCalculator(b)).reverse();
};

export const truncateString = (str: string, num: number) => {
  // Split the string into an array of words
  let words = str.split(" ");

  // Check if the string length is greater than the specified number of words
  if (words.length > num) {
    // Slice the array to get only the first 'num' words
    words = words.slice(0, num);

    // Join the words back together with a space
    return words.join(" ") + "...";
  } else {
    // If the string has 'num' or fewer words, return the original string
    return str;
  }
};
