import { Button, Col, Flex, Row, Tag } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { TProduct } from "../../types/product.type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShoppingCart } from "../../redux/features/auth/auth.Slice";

const AddToCartBtnComponent = ({ product }: { product: TProduct }) => {
  const { shoppingCart } = useAppSelector((state) => state.auth);
  console.log(shoppingCart);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(setShoppingCart({ type: "ADD_TO_CART", id: product?._id }));
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
            style={{ fontSize: "1.5rem", borderRight: "1px solid #5f6c72", padding: "0.3rem 0" }}
            className="cursor-pointer col-span-1"
          >
            -
          </span>{" "}
          <span className="col-span-2">33</span>
          <span
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
          onClick={handleAddToCart}
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
