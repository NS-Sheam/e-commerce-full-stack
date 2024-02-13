import { Card, Divider } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { TSubTotal } from "../../pages/dashboard/customer/ShoppingCart";
import CommonBtn from "./CommonBtn";

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
      <p className={`${titleCss} text-xl py-2`}>
        <span>Total</span>
        <span className={`${itemCss}`}>{subTotal.total}</span>
      </p>
      <CommonBtn>
        Proceed to Checkout <FaArrowRight />
      </CommonBtn>
    </Card>
  );
};

export default CartTotalComponent;
