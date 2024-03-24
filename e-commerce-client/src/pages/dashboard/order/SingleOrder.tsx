import { Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAllOrdersQuery } from "../../../redux/features/order/order.api";
import moment from "moment";

import OrderTimeLine from "../../../components/ui/order/OrderTimeLine";
import OrderActivity from "../../../components/ui/order/OrderActivity";
import { TProduct } from "../../../types";

const SingleOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: singleOrder, isLoading: isOrderLoading, isFetching: isOrderFetching } = useAllOrdersQuery(undefined);

  const order = singleOrder?.data?.find((order) => order._id === orderId);
  const productsWithQuantity = order?.products.reduce((acc, product) => {
    const existingProduct = acc.find((p: TProduct) => p._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      return acc;
    }
    return [...acc, { ...product, quantity: 1 }];
  }, [] as any);

  if (isOrderLoading || isOrderFetching) {
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
          md={{ span: 20 }}
          className="space-y-4"
        >
          <div className="bg-[#F7E99E] p-6 md:flex justify-between items-center">
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
              {productsWithQuantity.map((product: any) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #e5e5e5",
                  }}
                  className="flex justify-between items-center shadow-lg p-4"
                >
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex gap-4 cursor-pointer "
                  >
                    <div className="w-24 h-24">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray text-lg">{product.description.slice(0, 60)}</p>
                    </div>
                  </div>
                  <p className="text-[#2DA5F3] text-lg font-semibold">
                    <span className="text-xl text-grayBlack">{product.quantity} x</span> ${product.price}
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
