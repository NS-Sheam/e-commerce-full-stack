import { Col, Row, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAllOrdersQuery,
  useChangeOrderStatusMutation,
  useCustomerOrderQuery,
  useVendorOrderQuery,
} from "../../../redux/features/order/order.api";
import moment from "moment";

import OrderTimeLine from "../../../components/ui/order/OrderTimeLine";
import OrderActivity from "../../../components/ui/order/OrderActivity";
import { TOrder, TProduct, TReduxResponse } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import Swal from "sweetalert2";
import { toast } from "sonner";
import LoadingComponent from "../../../components/LoadingComponent";

const SingleOrder = () => {
  const user = useAppSelector(selectCurrentUser);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const {
    data: customerSingleOrder,
    isLoading: isCustomerOrderLoading,
    isFetching: isCustomerOrderFetching,
  } = useCustomerOrderQuery(undefined);
  const {
    data: vendorSingleOrder,
    isLoading: isVendorOrderLoading,
    isFetching: isVendorOrderFetching,
  } = useVendorOrderQuery(undefined);
  const { data: singleOrder, isLoading: isOrderLoading, isFetching: isOrderFetching } = useAllOrdersQuery(undefined);
  const [changeOrderStatus] = useChangeOrderStatusMutation();

  const order =
    user?.userType === "customer"
      ? customerSingleOrder?.data?.find((order) => order._id === orderId)
      : user?.userType === "vendor"
      ? vendorSingleOrder?.data?.find((order) => order._id === orderId)
      : singleOrder?.data?.find((order) => order._id === orderId);
  const productsWithQuantity = order?.products.reduce((acc, product) => {
    const existingProduct = acc.find((p: TProduct) => p._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      return acc;
    }
    return [...acc, { ...product, quantity: 1 }];
  }, [] as any);

  const handleOrderStatusChange = async (value: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const toastId = toast.loading("Changing order status...", { duration: 2000 });
          const res = (await changeOrderStatus({
            id: order?._id as string,
            data: { status: value },
          })) as TReduxResponse<TOrder>;
          if (!res.error) {
            toast.success(res.message || "Order status updated successfully", { id: toastId, duration: 2000 });
          } else {
            toast.error(
              res?.error?.data?.errorSources[0].message || res.error.message || "Order status updating failed",
              {
                id: toastId,
                duration: 2000,
              }
            );
          }
        } catch (error: any) {
          toast.error(error.message || "Order status updating failed", { duration: 2000 });
        }
      }
    });
  };

  if (
    isOrderLoading ||
    isOrderFetching ||
    isCustomerOrderLoading ||
    isCustomerOrderFetching ||
    isVendorOrderLoading ||
    isVendorOrderFetching
  ) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <LoadingComponent />
      </div>
    );
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
          {(user?.userType === "superAdmin" || user?.userType === "admin") && (
            <>
              <p
                className="text-gray md:text-lg"
                style={{ fontWeight: 500 }}
              >
                Order Status
              </p>
              <Select
                style={{ width: 200 }}
                defaultValue={order?.status}
                onChange={handleOrderStatusChange}
              >
                <Select.Option value="shipped">Shipped</Select.Option>
                <Select.Option value="delivered">Delivered</Select.Option>
              </Select>
            </>
          )}
          <OrderTimeLine order={order!} />
          <div className="space-y-4">
            <h3 className="text-2xl text-grayBlack">Order Summary</h3>
            <div className="space-y-4">
              {productsWithQuantity?.map((product: any) => (
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
