import { Card, Tag } from "antd";
import { TProduct } from "../../types/product.type";
import { FaEye, FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import "../../styles/ProductCard.css";
import { Link } from "react-router-dom";
import {
  useGetSingleCustomerQuery,
  useUpdateWishListMutation,
} from "../../redux/features/userManagement/userManagement.api";
import { handleAddToWishList } from "../../utils/updateWishList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleAddToShoppingCart, handleRemoveFromShoppingCart } from "../../utils/setShoppingCart";
import { setShoppingCart } from "../../redux/features/auth/auth.Slice";
const ProductCard = ({ product }: { product: TProduct }) => {
  const { data: customerData } = useGetSingleCustomerQuery(undefined);
  const [updateWishList] = useUpdateWishListMutation();
  const wishList = customerData?.wishList;
  const doesWishListContainProduct = wishList?.some((p) => p._id === product._id) as boolean;

  const { shoppingCart } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const doesProductExistToShoppingCart = shoppingCart.some((item) => item === product._id);
  const handleShoppingCart = () => {
    doesProductExistToShoppingCart
      ? handleRemoveFromShoppingCart({ id: product._id, dispatchFn: dispatch, removeFn: setShoppingCart })
      : handleAddToShoppingCart({ id: product._id, shoppingCart, dispatchFn: dispatch, addFn: setShoppingCart });
  };

  const handleSubmit = async () => {
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
      className="product-card"
      key={product._id}
      hoverable
      style={{ width: "100%" }}
      cover={
        <div style={{ width: "100%", height: 200, position: "relative" }}>
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
          />
        </div>
      }
    >
      {product.discount && (
        <Tag
          className="absolute top-2 right-0"
          color="#f50"
        >
          {Math.ceil((product?.discount / product?.price) * 100) || 0}% OFF
        </Tag>
      )}
      <h3 className="text-[#191C1F] font-medium">{product.name}</h3>
      <p className="text-[#2DA5F3] font-semibold">${product.price - product?.discount || 0}</p>
    </Card>
  );
};

export default ProductCard;
