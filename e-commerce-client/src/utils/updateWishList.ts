import { toast } from "sonner";
import { TResponse } from "../types/global";
import { TUser } from "../types/userManagement.type";

type TUpdateWishList = {
  productId: string;
  doesWishListContainProduct: boolean;
  updateFn: (data: { productId: string }) => Promise<any>;
};

export const handleAddToWishList = async ({ productId, doesWishListContainProduct, updateFn }: TUpdateWishList) => {
  const toastId = toast.loading(doesWishListContainProduct ? "Removing from wishlist..." : "Adding to wishlist...");
  const res = (await updateFn({
    productId,
  })) as TResponse<TUser>;

  if (res.error) {
    toast.error(res?.error?.message || "Something went wrong", { id: toastId });
    return;
  }
  toast.success(doesWishListContainProduct ? "Removed from wishlist" : "Added to wishlist", { id: toastId });
};
