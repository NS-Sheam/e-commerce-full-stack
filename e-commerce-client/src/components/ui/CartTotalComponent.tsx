import { Button, Card, Divider } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { TSubTotal } from "../../pages/dashboard/customer/ShoppingCart";

const CartTotalComponent = ({ subTotal }: { subTotal: TSubTotal }) => {
  const titleCss = "flex items-center justify-between gap-2";
  const itemCss = "font-bold";
  return (
    <Card
      title="Cart Total"
      bordered={false}
    >
      <p className={`${titleCss}`}>
        <span>Sub-Total</span>
        <span className={`${itemCss}`}>{subTotal.total + subTotal.totalDiscount}</span>
      </p>
      <p className={`${titleCss}`}>
        <span>Shipping</span>
        <span className={`${itemCss}`}>Free</span>
      </p>
      <p className={`${titleCss}`}>
        <span>Discount</span>
        <span className={`${itemCss}`}>{subTotal.totalDiscount}</span>
      </p>
      <p className={`${titleCss}`}>
        <span>Tax</span>
        <span className={`${itemCss}`}>{(subTotal.total * 5) / 100}</span>
      </p>
      <Divider style={{ margin: "1rem" }} />
      <p className={`${titleCss} text-xl`}>
        <span>Total</span>
        <span className={`${itemCss}`}>{subTotal.total}</span>
      </p>
      <Button
        // onClick={handleSubmit}
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
        Proceed to Checkout <FaArrowRight />
      </Button>
    </Card>
  );
};

export default CartTotalComponent;
