import { Button, Col, Row } from "antd";
import { toast } from "sonner";

import { useLocation } from "react-router-dom";
import { TResponse } from "../../types";
import { useState } from "react";
import { IoIosCloudDone } from "react-icons/io";
import { useVerifyEmailMutation } from "../../redux/features/auth/auth.api";

const VerifyEmail = () => {
  const [VerifyEmail] = useVerifyEmailMutation();
  const [verify, setVerify] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";

  const handleVerify = async () => {
    const toastId = toast.loading("Email verification in progress...");
    try {
      const res = (await VerifyEmail({ token })) as TResponse<any>;

      if (res.error) {
        toast.error("Verification Unsuccessful", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Email verified successfully", { id: toastId, duration: 2000 });
        setVerify(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", backgroundColor: "" }}
      className="shadow-md py-6 md:py-10 lg:py-16"
    >
      <Col
        span={22}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        className="bg-white shadow-lg space-y-4  rounded-lg"
      >
        <div className="p-4">
          {verify ? (
            <div className="flex flex-col justify-center items-center text-center">
              <IoIosCloudDone className="text-7xl text-primary" />
              <h1 className="text-xl font-bold">Email verified successfully</h1>
            </div>
          ) : (
            <Row
              justify="center"
              align="middle"
              gutter={[0, 8]}
            >
              <Col span={24}>
                <h1 className="text-center text-2xl font-bold text-darkPrimary">Verify Your Email</h1>
                <p className="text-center font-bold">Click the button below to verify your email</p>
              </Col>

              <Col span={24}>
                <Button
                  onClick={handleVerify}
                  style={{ width: "100%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
                >
                  Verify
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default VerifyEmail;
