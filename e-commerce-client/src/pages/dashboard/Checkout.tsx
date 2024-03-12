import { Col, Row } from "antd";
import EComInput from "../../components/form/EComInput";
import EComForm from "../../components/form/EComForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CartTotalComponent from "../../components/ui/CartTotalComponent";
import { useGetMyInfoQuery } from "../../redux/features/auth/auth.api";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { subTotalFn } from "../../utils/subTotal";
import { useGetProductsQuery } from "../../redux/features/productManagement/productManagement.api";

const Checkout = () => {
  const { data: mInfo, isLoading: isMyInfoLoading, isFetching: isMyInfoFecthing } = useGetMyInfoQuery(undefined);
  const { products } = useAppSelector((state) => state.order);
  const shoppingCartQuery = products?.map((id) => ({ name: "_id", value: id }));
  const { data: pData, isLoading: isPLoading, isFetching: isPFetching } = useGetProductsQuery(shoppingCartQuery);
  const [subTotal, setSubTotal] = useState({
    total: 0,
    totalDiscount: 0,
  });
  const productData = pData?.data;
  const myInfo = mInfo?.data;

  const defaultValues = {
    firstName: myInfo?.name?.firstName,
    lastName: myInfo?.name?.lastName,
    email: myInfo?.email,
    phone: myInfo?.mobileNo,
  };

  useEffect(() => {
    if (productData) {
      const { total, totalDiscount } = subTotalFn(products, productData);
      setSubTotal({ total, totalDiscount });
    }
  }, [productData, products]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  const handlePlaceOrder = () => {
    console.log("Order Placed");
  };
  if (isMyInfoLoading || isMyInfoFecthing || isPLoading || isPFetching) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4 space-y-2">
      <h3 className="text-grayBlack">Billing Information</h3>
      <EComForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      >
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            md={16}
          >
            <Row gutter={[12, 12]}>
              <Col
                span={24}
                md={{ span: 6 }}
              >
                <EComInput
                  type="text"
                  name="firstName"
                  label="First Name"
                  disabled
                />
              </Col>
              <Col
                span={24}
                md={{ span: 6 }}
              >
                <EComInput
                  type="text"
                  name="lastName"
                  label="First Name"
                  disabled
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="address"
                  label="Address"
                  required
                />
              </Col>
              <Col
                span={12}
                md={{ span: 6 }}
              >
                <EComInput
                  type="text"
                  name="country"
                  label="Country"
                />
              </Col>
              <Col
                span={12}
                md={{ span: 6 }}
              >
                <EComInput
                  type="text"
                  name="state"
                  label="Region/State"
                />
              </Col>
              <Col
                span={12}
                md={{ span: 6 }}
              >
                <EComInput
                  type="text"
                  name="city"
                  label="City"
                />
              </Col>
              <Col
                span={12}
                md={{ span: 6 }}
              >
                <EComInput
                  type="text"
                  name="postalCode"
                  label="Postal Code"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="email"
                  label="Email"
                  disabled
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="phone"
                  label="Phone Number"
                  disabled
                />
              </Col>
            </Row>
          </Col>
          <Col
            span={24}
            md={8}
          >
            <CartTotalComponent
              subTotal={subTotal}
              title="Order Summery"
              btnTitle="Place Order"
              btnProps={{
                htmlType: "submit",
              }}
            />
          </Col>
        </Row>
      </EComForm>
    </div>
  );
};

export default Checkout;
