import { Button, Col, Row, Tag } from "antd";

import { FaShoppingCart } from "react-icons/fa";
import { TProduct } from "../../types";
import CommonBtn from "../ui/CommonBtn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { handleAddToShoppingCart } from "../../utils/setShoppingCart";
import { setShoppingCart } from "../../redux/features/auth/auth.Slice";
import { useNavigate } from "react-router-dom";

/**
 * TODO:
 * 1. Make a reusable function for updating wishlist and shopping cart in both ProductCard and FeatureProductLargeCard
 * 1. Make total feedbacks dynamic
 */

type TShopProductLargeCardProps = {
  product: TProduct | undefined;
};

const ShopProductLargeCard = ({ product }: TShopProductLargeCardProps) => {
  const { shoppingCart } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleShoppingCart = () => {
    handleAddToShoppingCart({ id: product!._id, shoppingCart, dispatchFn: dispatch, addFn: setShoppingCart });
  };
  return (
    <Row className="hidden lg:block shadow-lg rounded-md overflow-hidden bg-white ">
      <Col
        span={24}
        className="relative bg-warning"
      >
        <img
          className="w-full h-full"
          src={product?.images[2]}
          alt=""
        />
      </Col>
      <Col
        span={24}
        className="space-y-3 bg-warning text-center flex flex-col justify-center items-center p-4"
      >
        <p className="text-[#BE4646] font-bold ">Best Selling Product</p>
        <h4 className="text-3xl text-grayBlack font-semibold ">{product?.name}</h4>
        <p className="font-semibold">For all ellectronics products</p>
        <div>
          <span>Only for: </span>
          <Tag
            color="#ffffff"
            style={{ color: "#191C1F", fontWeight: "600", fontSize: "1rem" }}
          >
            {product?.price} BDT
          </Tag>
        </div>
        <div className="w-2/3 mx-auto space-y-2">
          <CommonBtn
            onClick={handleShoppingCart}
            size="large"
          >
            <FaShoppingCart /> Add To Cart
          </CommonBtn>
          <Button
            onClick={() => navigate(`/product/${product?._id}`)}
            size="large"
            style={{
              color: "#fa8232",
              fontWeight: "bold",
              border: "2px solid #fa8232",
              width: "100%",
              borderRadius: "0",
            }}
          >
            View Details
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ShopProductLargeCard;
