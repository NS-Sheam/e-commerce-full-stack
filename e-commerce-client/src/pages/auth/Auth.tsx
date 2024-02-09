import { Col, Row } from "antd";
import { useState } from "react";
import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";

const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);

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
        <Row
          justify={"center"}
          align={"middle"}
        >
          <Col
            onClick={() => setShowRegister(false)}
            span={12}
            className="border-b-4 border-orange "
          >
            <p
              className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                !showRegister ? "bg-grayWhite" : ""
              }`}
            >
              Sign in
            </p>
            <hr className={`h-2 w-full bg-orange ${!showRegister ? "visible" : "hidden"}`} />
          </Col>
          <Col
            onClick={() => setShowRegister(true)}
            span={12}
          >
            <p
              className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                showRegister ? "bg-grayWhite" : ""
              }`}
            >
              Sign up
            </p>
            <hr className={`h-2 w-full bg-orange ${showRegister ? "visible" : "hidden"}`} />
          </Col>
        </Row>
        {showRegister ? <Register /> : <Login />}
      </Col>
    </Row>
  );
};

export default Auth;
