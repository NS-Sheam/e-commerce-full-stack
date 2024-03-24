import { Col, Row, Tag } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { useAllOrdersQuery, useCustomerOrderQuery, useVendorOrderQuery } from "../../../redux/features/order/order.api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";

const Orders = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: orders, isLoading: isOrderLoading, isFetching: isOrderFetching } = useAllOrdersQuery(undefined);
  const {
    data: vendorOrders,
    isLoading: isVendorOrderLoading,
    isFetching: isVendorOrderFetching,
  } = useVendorOrderQuery(undefined);

  const {
    data: customerOrders,
    isLoading: customerOrderLoading,
    isFetching: customerOrderFetching,
  } = useCustomerOrderQuery([
    {
      name: "paymentStatus",
      value: "true",
    },
  ]);

  const navigate = useNavigate();
  const orderedProducts =
    user?.userType === "customer"
      ? customerOrders?.data
          ?.map((order) => {
            return order.products.map((product) => {
              return {
                ...product,
                order,
              };
            });
          })
          .flat()
      : user?.userType === "vendor"
      ? vendorOrders?.data?.map((order) => {
          return order.products.map((product) => {
            return {
              ...product,
              order,
            };
          });
        })
      : orders?.data
          ?.map((order) => {
            return order.products.map((product) => {
              return {
                ...product,
                order,
              };
            });
          })
          .flat();

  const handleNavigateProductOrder = (orderId: string, productId: string) => {
    navigate(`/order/${orderId}/${productId}`);
  };

  if (customerOrderLoading || customerOrderFetching) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Order History</h3>
      </DashboardHeading>
      <Row gutter={[16, 16]}>
        {orderedProducts?.map((product, index) => (
          <Col
            key={index}
            span={12}
            md={{ span: 24 }}
            style={{
              border: "1px solid #e5e5e5",
              padding: "1rem",
            }}
            className="shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleNavigateProductOrder(product.order._id, product._id)}
          >
            <Row
              gutter={[16, 16]}
              justify="center"
              align="middle"
            >
              <Col
                span={24}
                md={{ span: 8 }}
              >
                <div className="md:flex items-center justify-start gap-2">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full md:w-32 md:h-20 text-grayBlack"
                  />
                  <span className="text-2xl md:text-xl font-semibold">{product.name}</span>
                </div>
              </Col>
              <Col
                span={24}
                md={{ span: 5 }}
              >
                <span className="text-[#2DA5F3] font-bold text-xl">${product.price}</span>
              </Col>
              <Col
                span={24}
                md={{ span: 5 }}
              >
                <Tag
                  className="text-base font-semibold"
                  color={
                    product.order.status === "placed"
                      ? "gold"
                      : product.order.status === "shipped"
                      ? "blue"
                      : product.order.status === "delivered"
                      ? "green"
                      : "red"
                  }
                >
                  {product.order.status}
                </Tag>
              </Col>

              <Col
                span={24}
                md={{ span: 6 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-grayBlack font-bold text-lg">
                  {moment(product.order.createdAt).format("MMMM Do YYYY")}
                </span>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Orders;
