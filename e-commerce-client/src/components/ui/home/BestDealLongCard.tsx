import { Col, Row } from "antd";
import { TProduct } from "../../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import CommonBtn from "../CommonBtn";
import {
  useGetSingleCustomerQuery,
  useUpdateWishListMutation,
} from "../../../redux/features/userManagement/userManagement.api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleAddToWishList } from "../../../utils/updateWishList";
import { setShoppingCart } from "../../../redux/features/auth/auth.Slice";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { handleAddToShoppingCart } from "../../../utils/setShoppingCart";

/**
 * TODO:
 * 1. Make a reusable function for updating wishlist and shopping cart in both ProductCard and BestDealLongCard
 */

const BestDealLongCard = ({ product }: { product: TProduct }) => {
  const { data: customerData } = useGetSingleCustomerQuery(undefined);
  const [updateWishList] = useUpdateWishListMutation();
  const wishList = customerData?.wishList;

  const doesWishListContainProduct = wishList?.some((p) => p._id === product._id) as boolean;

  const { shoppingCart } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const handleShoppingCart = () => {
    handleAddToShoppingCart({ id: product._id, shoppingCart, dispatchFn: dispatch, addFn: setShoppingCart });
  };

  const handleSubmit = async () => {
    await handleAddToWishList({
      productId: product._id,
      doesWishListContainProduct,
      updateFn: updateWishList,
    });
  };

  const iconStyle =
    "bg-orange p-3 flex items-center justify-center text-orange text-xl bg-opacity-10 cursor-pointer duration-300";

  return (
    <Row
      gutter={[16, 16]}
      className="shadow-lg rounded-md overflow-hidden bg-white h-full"
    >
      <Col span={24}>
        <div className="h-full">
          <img
            className="w-full h-full"
            src={product?.images[0]}
            alt=""
          />
        </div>
      </Col>
      <Col
        span={24}
        className="space-y-2"
      >
        <div className="flex items-center justify-start gap-3">
          <Rating
            style={{ maxWidth: 100 }}
            readOnly
            value={4.5}
          />
          <span className="font-bold text-gray text-xs">(322)</span>
        </div>
        <h4 className="text-[18px]">{product?.name}</h4>
        <p className=" font-bold text-[#2DA5F3] flex justify-start items-center gap-2">
          <span>${product?.price}</span>
          {"  "}
          <span className={`font-semibold text-gray line-through`}>{product.price + (product?.discount || 0)}</span>
        </p>
        <p className="text-gray">{product?.description}</p>
        <div>
          <Row gutter={[6, 6]}>
            <Col span={4}>
              <span
                onClick={handleSubmit}
                className={`${iconStyle}`}
              >
                {doesWishListContainProduct ? <FaHeart /> : <FaRegHeart />}
              </span>
            </Col>
            <Col
              span={16}
              onClick={handleShoppingCart}
            >
              <CommonBtn size="large">Shop Now</CommonBtn>
            </Col>
            <Col span={4}>
              <Link to={`/product/${product._id}`}>
                <span className={`${iconStyle}`}>
                  <FaEye />
                </span>
              </Link>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default BestDealLongCard;
