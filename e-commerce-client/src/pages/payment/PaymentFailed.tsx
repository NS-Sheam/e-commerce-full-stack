import { Col, Row } from "antd";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMyInfoQuery } from "../../redux/features/auth/auth.api";
import CommonBtn from "../../components/ui/CommonBtn";
import { BsMenuButton } from "react-icons/bs";

const PaymentFailed = () => {
  const { data: mInfo, isLoading: isMyInfoLoading, isFetching: isMyInfoFetching } = useGetMyInfoQuery(undefined);
  const navigate = useNavigate();
  const myInfo = mInfo?.data;
  const { transactionId } = useParams<{ transactionId: string }>();
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
          <FaExclamationCircle
            size={70}
            className="text-red-500"
          />
          <h2>Your payment is failed</h2>
          <p>
            Hello {myInfo?.fullName}, your payment is failed. Your transaction id is {transactionId}
          </p>

          <CommonBtn
            onClick={() => navigate("/customer/home")}
            size="middle"
          >
            Go to Dashboard
            <BsMenuButton />
          </CommonBtn>
        </div>
      </Col>
    </Row>
  );
};

export default PaymentFailed;
