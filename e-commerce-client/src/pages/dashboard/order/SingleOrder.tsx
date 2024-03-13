import { Col, Flex, Row } from "antd";
import { useParams } from "react-router-dom";
import { useCustomerOrderQuery } from "../../../redux/features/order/order.api";
import moment from "moment";

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
        >
          <Flex
            justify="space-between"
            align="center"
            style={{
              backgroundColor: "#F7E99E",
              padding: "1rem",
            }}
          >
            <div>
              <h3 className="text-2xl text-gray font-semibold">{order?.invoice}</h3>
              <p
                className="text-gray text-lg"
                style={{ fontWeight: 500 }}
              >
                {order?.products.length} Products | Order Placed in{" "}
                {moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
            <p className="text-[#2DA5F3] text-3xl font-bold">${order?.totalPrice}</p>
          </Flex>
          <p
            className="text-gray text-lg"
            style={{ fontWeight: 500 }}
          >
            Order expected to be delivered in {moment(order?.createdAt).add(7, "days").format("MMMM Do YYYY")}
          </p>
        </Col>
      </Row>
    </p>
  );
};

export default SingleOrder;
