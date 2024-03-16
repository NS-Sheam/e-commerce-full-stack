import { Button, Col, Flex, Row } from "antd";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMyInfoQuery } from "../../redux/features/auth/auth.api";
import CommonBtn from "../../components/ui/CommonBtn";
import { BsMenuButton } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";

const PaymentSuccess = () => {
  const { data: myInfo, isLoading: isMyInfoLoading, isFetching: isMyInfoFetching } = useGetMyInfoQuery(undefined);
  const navigate = useNavigate();

  const { transactionId } = useParams<{ transactionId: string }>();
  if (isMyInfoLoading || isMyInfoFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "50vh", backgroundColor: "" }}
      className="shadow-md py-6 md:py-10 lg:py-16"
    >
      <Col
        span={22}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        className="bg-white shadow-lg space-y-4  rounded-lg"
      >
        <div className="p-4 space-y-2 flex flex-col items-center justify-center text-center">
          <IoCheckmarkDoneCircle
            size={70}
            color={"#4bb809"}
          />
          <h2>Your order is successfully placed</h2>
          <p>
            Hello {myInfo?.fullName}, your order is successfully placed. Your transaction id is {transactionId}
          </p>
          <Flex
            justify="space-between"
            align="middle"
            gap="middle"
          >
            <Button
              onClick={() => navigate("/customer/home")}
              size="middle"
              style={{ color: "#FF8C00", border: "FF8C00", height: "100%" }}
            >
              <p className="flex items-center justify-center gap-2">
                <BsMenuButton /> <span>GO TO DASHBOARD</span>
              </p>
            </Button>
            <CommonBtn
              onClick={() => navigate("/customer/order-history")}
              size="middle"
            >
              View Order
              <FaArrowRight />
            </CommonBtn>
          </Flex>
        </div>
      </Col>
    </Row>
  );
};

export default PaymentSuccess;
