import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";

import { useLocation } from "react-router-dom";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import { useResetPasswordMutation } from "../../redux/features/auth/auth.api";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Resetting password...");
    try {
      await resetPassword({ data, token });
      toast.success("Password reset successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
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
                  <Col span={24}>
                    <EComInput
                      style={commonInputStyle}
                      type="password"
                      name="newPassword"
                      label="New Password"
                    />
                  </Col>
                </Row>
                <Button
                  htmlType="submit"
                  style={{ width: "100%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
                >
                  Reset Password
                </Button>
              </EComForm>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
