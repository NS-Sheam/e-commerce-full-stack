import { FaCheck, FaCheckDouble } from "react-icons/fa6";
import { TOrder } from "../../../types";
import moment from "moment";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoDocumentTextSharp } from "react-icons/io5";

const OrderActivity = ({ order }: { order: TOrder }) => {
  const iconDivCommonCss = "text-2xl px-4 py-3 rounded-md";
  const activityTextPCommonCss = "text-grayBlack text-xl font-semibold";
  const activityTextDCommonCss = "text-gray text-lg ";

  const deliveredStatus = (
    <div className="flex justify-start items-center gap-3">
      <div className={`${iconDivCommonCss} bg-[#D5F0D3]`}>
        <FaCheckDouble className="text-[#2DB224] " />
      </div>
      <div>
        <p className={`${activityTextPCommonCss}`}>Your order has been delivered</p>
        <p className={`${activityTextDCommonCss}`}>{moment(order?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>
    </div>
  );

  const shippedStatus = (
    <div className="flex justify-start items-center gap-3">
      <div className={`${iconDivCommonCss} bg-[#D5EDFD]`}>
        <LiaShippingFastSolid className="text-[#2DA5F3]" />
      </div>
      <div>
        <p className={`${activityTextPCommonCss}`}>Your order is shipped</p>
        <p className={`${activityTextDCommonCss}`}>{moment(order?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 ">
      <h3 className="text-2xl text-grayBlack">Order Activity</h3>

      <div className="space-y-6">
        {order?.status === "delivered" && (
          <>
            {deliveredStatus}
            {shippedStatus}
          </>
        )}
        {order?.status === "shipped" && (
          <div className="flex justify-start items-center gap-3">
            <div className={`${iconDivCommonCss} bg-[#D5EDFD]`}>
              <LiaShippingFastSolid className="text-[#2DA5F3]" />
            </div>
            <div>
              <p className={`${activityTextPCommonCss}`}>Your order is shipped</p>
              <p className={`${activityTextDCommonCss}`}>
                {moment(order?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-start items-center gap-3">
          <div className={`${iconDivCommonCss} bg-[#D5F0D3]`}>
            <FaCheck className="text-[#2DB224]" />
          </div>
          <div>
            <p className={`${activityTextPCommonCss}`}>Your order is successfully verified</p>
            <p className={`${activityTextDCommonCss}`}>{moment(order?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className={`${iconDivCommonCss} bg-[#D5EDFD]`}>
            <IoDocumentTextSharp className="text-[#2DA5F3]" />
          </div>
          <div>
            <p className={`${activityTextPCommonCss}`}>Your order has been confirmed</p>
            <p className={`${activityTextDCommonCss}`}>{moment(order?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderActivity;
