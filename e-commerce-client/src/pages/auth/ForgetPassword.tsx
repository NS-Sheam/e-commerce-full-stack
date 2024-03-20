import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";

import { useState } from "react";
import { IoIosCloudDone } from "react-icons/io";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import { useForgetPasswordMutation } from "../../redux/features/auth/auth.api";
import { TReduxResponse } from "../../types";

const ForgetPassword = () => {
  const [sentEmail, setSentEmail] = useState(false);

  const [forgetPassword] = useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Sending reset password link...");

    try {
      const res = (await forgetPassword(data)) as TReduxResponse<any>;

      if (!res.error) {
        toast.success("Check your email for reset password link", { id: toastId, duration: 2000 });
        setSentEmail(true);
      } else {
        toast.error(res?.error?.data?.errorSources[0].message || res.error.message || "Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId, duration: 2000 });
    }
  };
  const commonInputStyle = {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "5px",
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
          <Row
            justify="center"
            align="middle"
          >
            <Col span={24}>
              {sentEmail ? (
                <div className="flex flex-col justify-center items-center text-center">
                  <IoIosCloudDone className="text-7xl text-darkPrimary" />
                  <h1 className="text-xl font-bold">Reset password link send to the email</h1>
                </div>
              ) : (
                <EComForm onSubmit={onSubmit}>
                  <Row gutter={8}>
                    <Col span={24}>
                      <EComInput
                        style={commonInputStyle}
                        type="email"
                        name="email"
                        label="Email"
                      />
                    </Col>
                  </Row>
                  <Button
                    htmlType="submit"
                    style={{ width: "100%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
                  >
                    Send Reset Password Link
                  </Button>
                </EComForm>
              )}
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ForgetPassword;
