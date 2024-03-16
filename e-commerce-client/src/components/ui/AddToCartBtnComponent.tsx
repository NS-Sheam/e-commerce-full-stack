import { Button, Col, Flex, Row, Tag } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { TProduct } from "../../types/product.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShoppingCart } from "../../redux/features/auth/auth.Slice";
import { handleAddToShoppingCart } from "../../utils/setShoppingCart";
import { useState } from "react";
import { toast } from "sonner";
import { setOrders } from "../../redux/features/order/order.Slice";
import { useNavigate } from "react-router-dom";

const AddToCartBtnComponent = ({ product }: { product: TProduct }) => {
  const { shoppingCart } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleShoppingCartSubmit = () => {
    handleAddToShoppingCart({ id: product._id, shoppingCart, dispatchFn: dispatch, addFn: setShoppingCart });
  };

  const [quantity, setQuantity] = useState(1);
  const handleBuyNow = () => {
    if (product.inventory.quantity < quantity) {
      toast.error("Quantity exceeds the available stock");
      return;
    }

    // Create an array of productId based on the quantity
    const productIdArray = Array.from({ length: quantity }, () => product._id);

    dispatch(setOrders(productIdArray));
    navigate("/checkout");
  };
  return (
    <Row
      gutter={[16, 16]}
      justify={"center"}
      align={"middle"}
    >
      <Col
        span={8}
        md={{ span: 4 }}
      >
        <Tag
          className="grid grid-cols-4 items-center justify-center text-center"
          style={{ fontWeight: "600", fontSize: "1.2rem", width: "100%" }}
        >
          <span
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
            }}
            style={{ fontSize: "1.5rem", borderRight: "1px solid #5f6c72", padding: "0.3rem 0" }}
            className="cursor-pointer col-span-1"
          >
            -
          </span>{" "}
          <span className="col-span-2">{quantity}</span>
          <span
            onClick={() => {
              if (product.inventory.quantity > quantity) {
                setQuantity(quantity + 1);
              } else {
                toast.error("Quantity exceeds the available stock");
              }
            }}
            style={{ fontSize: "1.5rem", borderLeft: "1px solid #5f6c72", padding: "0.3rem 0" }}
            className="cursor-pointer col-span-1"
          >
            +
          </span>
        </Tag>
      </Col>
      <Col
        span={16}
        md={{ span: 12 }}
      >
        <Button
          onClick={handleShoppingCartSubmit}
          size="large"
          style={{
            width: "100%",
            color: "#ffffff",
            fontWeight: "bold",
            border: "2px solid #fa8232",
            backgroundColor: "#fa8232",
            borderRadius: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Add to Cart <FaShoppingCart />
        </Button>
      </Col>
      <Col
        span={24}
        md={{ span: 8 }}
      >
        <Flex justify="end">
          <Button
            onClick={handleBuyNow}
            size="large"
            style={{ color: "#fa8232", fontWeight: "bold", border: "2px solid #fa8232", width: "100%" }}
          >
            Buy Now
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default AddToCartBtnComponent;
