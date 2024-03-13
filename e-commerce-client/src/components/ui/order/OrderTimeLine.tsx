import { LuPackage } from "react-icons/lu";
import { TOrder } from "../../../types";
import { FaHandshake, FaTruck } from "react-icons/fa6";

const OrderTimeLine = ({ order }: { order: TOrder }) => {
  const orderBoxCommonCss = "flex flex-col justify-center items-center gap-2";
  const timeLineCircleCss = "w-8 md:w-12 h-3 md:h-5 bg-orange rounded-full";
  const timeLineLineCss = "bg-orange h-3 rounded-full w-full";
  const timeLineIconCss = "text-2xl md:text-4xl";
  const timeLineTextCss = "text-sm md:text-xl font-semibold";
  return (
    <>
      <div
        className="flex items-center justify-start gap-1 "
        style={{ padding: "1rem 2rem " }}
      >
        <div className={`${timeLineCircleCss} `}></div>
        <hr
          className={`${timeLineLineCss} ${
            order?.status === "shipped" || order?.status === "delivered" ? "bg-orange" : "bg-[#FFE7D6] border-none"
          }`}
        />
        <div
          className={`${timeLineCircleCss} ${
            order?.status === "shipped" || order?.status === "delivered" ? "bg-orange" : "bg-[#FFE7D6] border-none"
          }`}
        ></div>
        <hr
          className={`${timeLineLineCss} ${
            order?.status === "delivered" ? "bg-orange border-orange" : "bg-[#FFE7D6] border-none"
          }`}
        />{" "}
        <div
          className={`${timeLineCircleCss} ${
            order?.status === "delivered" ? "bg-orange border-orange" : "bg-[#FFE7D6] border-none"
          }`}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <div className={`${orderBoxCommonCss}`}>
          <LuPackage className={`${timeLineIconCss} text-[#2DB224]`} />
          <span className={`${timeLineTextCss}`}>Order Placed</span>
        </div>
        <div className={`${orderBoxCommonCss}`}>
          <FaTruck
            className={`${timeLineIconCss} ${
              order?.status === "shipped" || order?.status === "delivered" ? "text-orange" : "text-[#FFE7D6]"
            }`}
          />
          <span
            className={`${timeLineTextCss} ${
              order?.status === "shipped" || order?.status === "delivered" ? "text-grayBlack" : "text-gray"
            }`}
          >
            Order Shipped
          </span>
        </div>
        <div className={`${orderBoxCommonCss}`}>
          <FaHandshake
            className={`${timeLineIconCss} ${order?.status === "delivered" ? "text-[#2DA5F3]" : "text-[#FFE7D6] "}`}
          />
          <span className={`${timeLineTextCss} ${order?.status === "delivered" ? "text-grayBlack" : "text-gray "}`}>
            Order Delivered
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderTimeLine;
