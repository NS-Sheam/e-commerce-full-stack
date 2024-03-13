import { Row } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { useCustomerOrderQuery } from "../../../redux/features/order/order.api";

const Orders = () => {
  const {
    data: orders,
    isLoading: customerOrderLoading,
    isFetching: customerOrderFetching,
  } = useCustomerOrderQuery([
    {
      name: "paymentStatus",
      value: "true",
    },
  ]);
  const orderedProducts = orders?.data?.map((order) => {
    return {
      ...order,
      products: order.products,
    };
  });
  console.log(orderedProducts);

  console.log(orderedProducts);

  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Order History</h3>
      </DashboardHeading>
      <Row
        gutter={[16, 16]}
        className="space-y-4"
      >
        {orderedProducts?.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Orders;
