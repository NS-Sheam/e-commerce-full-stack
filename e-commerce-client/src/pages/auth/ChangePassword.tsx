import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";

import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import { useChangePasswordMutation } from "../../redux/features/auth/auth.api";
import { TReduxResponse } from "../../types";

const ChangePassword = () => {
  const [ChangePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing password...");
    try {
      const res = (await ChangePassword(data)) as TReduxResponse<any>;

      if (!res.error) {
        toast.success("Password changed successfully", { id: toastId });
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
              <EComForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={24}>
                    <EComInput
                      style={commonInputStyle}
                      type="password"
                      name="oldPassword"
                      label="Old Password"
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
                  Change Password
                </Button>
              </EComForm>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePassword;
