import { Button, Col, Flex, Row } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import errorImg from "../assets/images/error-image.png";

import { FaArrowLeft } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import CommonBtn from "../components/ui/CommonBtn";

const ErrorPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Row
      justify="center"
      align="middle"
      className="shadow-md py-6 md:py-10 lg:py-16 min-h-screen"
    >
      <Col
        span={24}
        md={{ span: 16 }}
        lg={{ span: 12 }}
        className="bg-white shadow-lg space-y-4  rounded-lg flex flex-col items-center justify-center p-4 text-center"
      >
        <img
          className="w-48 md:w-60 lg:w-80"
          src={errorImg}
          alt=""
        />
        <h2>{pathname} Not Found</h2>
        <p>
          Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or
          the page is removed.
        </p>
        <Flex
          justify="space-between"
          align="middle"
          gap="middle"
        >
          <CommonBtn
            onClick={() => navigate(-1)}
            size="middle"
          >
            <FaArrowLeft /> <span>GO BACK</span>
          </CommonBtn>
          <Button
            onClick={() => navigate("/")}
            size="middle"
            style={{ color: "#FF8C00", border: "FF8C00", height: "100%" }}
          >
            <p className="flex items-center justify-center gap-2">
              <FaHome />
              GO TO HOME
            </p>
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default ErrorPage;
