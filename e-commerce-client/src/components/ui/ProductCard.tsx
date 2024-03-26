import { Card, Tag } from "antd";
import { TProduct } from "../../types/product.types";
import { FaEye, FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import "../../styles/ProductCard.css";
import { Link } from "react-router-dom";
import { useGetMeQuery, useUpdateWishListMutation } from "../../redux/features/userManagement/userManagement.api";
import { handleAddToWishList } from "../../utils/updateWishList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleAddToShoppingCart, handleRemoveFromShoppingCart } from "../../utils/setShoppingCart";
import { setShoppingCart } from "../../redux/features/auth/auth.Slice";
import { discountCalculator } from "../../utils/product.utils";
import { Rating } from "@smastrom/react-rating";
import { toast } from "sonner";
const ProductCard = ({ product, rating }: { product: TProduct; rating?: boolean }) => {
  const { data: customerData } = useGetMeQuery(undefined);

  const [updateWishList] = useUpdateWishListMutation();
  const wishList = customerData?.wishList;
  const doesWishListContainProduct = wishList?.some((p) => p._id === product._id) as boolean;

  const { shoppingCart } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const doesProductExistToShoppingCart = shoppingCart.some((item) => item === product._id);
  const handleShoppingCart = () => {
    if (!customerData || !customerData._id) {
      toast.error("Please login to add to cart");
      return;
    }
    doesProductExistToShoppingCart
      ? handleRemoveFromShoppingCart({ id: product._id, dispatchFn: dispatch, removeFn: setShoppingCart })
      : handleAddToShoppingCart({ id: product._id, shoppingCart, dispatchFn: dispatch, addFn: setShoppingCart });
  };
  const avgProductRating = product?.productReview.length
    ? product?.productReview?.reduce((acc, review) => acc + review.rating, 0) / product.productReview.length
    : 5;

  const handleSubmit = async () => {
    if (!customerData || !customerData._id) {
      toast.error("Please login to add to wishlist");
      return;
    }
    await handleAddToWishList({
      productId: product._id,
      doesWishListContainProduct,
      updateFn: updateWishList,
    });
  };

  const iconStyle =
    "bg-white hover:bg-orange p-3 flex items-center justify-center rounded-full text-grayBlack hover:text-white text-xl duration-300";
  return (
    <Card
      className="product-card h-full relative "
      key={product._id}
      hoverable
      style={{ width: "100%" }}
      cover={
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div className="card-icon-container">
            <span
              onClick={handleSubmit}
              className={`${
                doesWishListContainProduct
                  ? "bg-orange hover:bg-white text-white hover:text-grayBlack"
                  : "bg-white hover:bg-orange text-grayBlack hover:text-white"
              }  p-3 flex items-center justify-center rounded-full text-xl duration-300`}
            >
              <FaRegHeart />
            </span>
            <span
              onClick={handleShoppingCart}
              className={`p-3 flex items-center justify-center rounded-full text-xl duration-300 ${
                doesProductExistToShoppingCart
                  ? "bg-orange hover:bg-white text-white hover:text-grayBlack"
                  : "bg-white hover:bg-orange text-grayBlack hover:text-white"
              } `}
            >
              {" "}
              <FaShoppingCart />
            </span>
            <Link
              to={`/product/${product._id}`}
              className={`${iconStyle} bg-white hover:bg-orange`}
            >
              <FaEye />
            </Link>
          </div>
          <img
            alt={product.name}
            src={product.images[0]}
            style={{ width: "100%", height: "100%" }}
            className="p-4"
          />
        </div>
      }
    >
      {product.discount && (
        <Tag
          className="absolute top-2 right-0"
          color="#f50"
        >
          {discountCalculator(product)}% OFF
        </Tag>
      )}
      {rating && (
        <Rating
          style={{ maxWidth: 80 }}
          readOnly
          value={Math.ceil(avgProductRating)}
        />
      )}
      <h3 className="text-[#191C1F] font-medium">{product.name}</h3>
      <p className="text-[#2DA5F3] font-semibold">${product.price - product?.discount || 0}</p>
    </Card>
  );
};

export default ProductCard;
