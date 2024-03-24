import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "sonner";
type TFn = (payload: { type: string; id: string }) => any;
/**
 * TODO:
 * - Make generic type for both add and remove function
 */

type TAddShoppingCartProps = {
  id: string;
  shoppingCart: string[];
  dispatchFn: Dispatch<{ type: string; id: string }>;
  addFn: TFn;
};
type TRemoveShoppingCartProps = {
  id: string;
  dispatchFn: Dispatch<{ type: string; id: string }>;
  removeFn: TFn;
};

export const handleAddToShoppingCart = ({ id, shoppingCart, dispatchFn, addFn }: TAddShoppingCartProps) => {
  if (shoppingCart.some((item) => item === id)) {
    toast.success("Already added to cart");
    return;
  }
  dispatchFn(addFn({ type: "ADD_TO_CART", id }));
  toast.success("Added to cart");
};
export const handleRemoveFromShoppingCart = ({ id, dispatchFn, removeFn }: TRemoveShoppingCartProps) => {
  dispatchFn(removeFn({ type: "REMOVE_FROM_CART", id }));
  toast.success("Removed From cart");
};
