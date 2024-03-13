import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { useCustomerOrderQuery } from "../../../redux/features/order/order.api";
import moment from "moment";

import OrderTimeLine from "../../../components/ui/order/OrderTimeLine";
import OrderActivity from "../../../components/ui/order/OrderActivity";

const SingleOrder = () => {
  const { orderId, productId } = useParams();
  const { data: oData, isLoading: orderLoading, isFetching: orderFetching } = useCustomerOrderQuery(undefined);
  const order = oData?.data?.find((order) => order._id === orderId);
  const product = oData?.data
    ?.find((order) => order._id === orderId)
    ?.products.find((product) => product._id === productId);
  if (orderLoading || orderFetching) {
    return <div>Loading...</div>;
  }

  return (
    <p className="p-4">
      <Row
        justify="center"
        align="top"
        style={{ minHeight: "50vh" }}
      >
        <Col
          span={24}
          md={{ span: 18 }}
          className="space-y-4"
        >
          <div className="bg-[#F7E99E] p-4 md:flex justify-between items-center">
            <div>
              <h3 className="text-xl md:text-2xl text-gray font-semibold">{order?.invoice}</h3>
              <p
                className="text-gray md:text-lg"
                style={{ fontWeight: 500 }}
              >
                {order?.products.length} Products | Order Placed in{" "}
                {moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
            <p className="text-[#2DA5F3] text-xl md:text-3xl font-bold">${order?.totalPrice}</p>
          </div>
          <p
            className="text-gray md:text-lg"
            style={{ fontWeight: 500 }}
          >
            Order expected to be delivered in {moment(order?.createdAt).add(7, "days").format("MMMM Do YYYY")}
          </p>
          <OrderTimeLine order={order!} />
          <div className="space-y-4">
            <h3 className="text-2xl text-grayBlack">Order Summary</h3>
            <div className="space-y-4">
              {order?.products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #e5e5e5",
                  }}
                  className="flex justify-between items-center border-b-2 shadow-lg p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray text-lg">${product.price}</p>
                    </div>
                  </div>
                  <p className="text-gray text-lg font-semibold">
                    {product.quantity} x ${product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <OrderActivity order={order!} />
        </Col>
      </Row>
    </p>
  );
};

export default SingleOrder;
