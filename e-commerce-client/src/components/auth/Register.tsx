import { FieldValues, SubmitHandler } from "react-hook-form";
import EComForm from "../form/EComForm";
import EComInput from "../form/EComInput";
import EComSelect from "../form/EComSelect";
import { Button, Col, Row } from "antd";

import EComProfileImageUploader from "../form/EComProfileImageUploader";
import { useRegistrationMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";
import { TReduxResponse } from "../../types/global";

const defaultValues = {
  userName: "customer321",
  name: {
    firstName: "Customer",
    middleName: "Nazmus",
    lastName: "Sakib",
  },
  email: "sakib@gmail.com",
  mobileNo: "012323232323",
  gender: "male",
};

const Register = () => {
  const [registerUser] = useRegistrationMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      password: data.password,
      customer: {
        ...data,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userInfo));
    if (data.image) formData.append("file", data.image?.originFileObj);
    try {
      const res = (await registerUser(formData)) as TReduxResponse<any>;
      console.log(res);
      if (!res.error) {
        toast.success("Registered successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="p-4">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <EComForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <Row gutter={8}>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="userName"
                  label="User Name"
                />
              </Col>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="name.firstName"
                  label="First Name"
                />
              </Col>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="name.lastName"
                  label="Last Name"
                />
              </Col>
              <Col span={24}>
                <EComSelect
                  label="Gender"
                  name="gender"
                  options={[
                    {
                      value: "male",
                      label: "Male",
                    },
                    {
                      value: "female",
                      label: "Female",
                    },
                    {
                      value: "other",
                      label: "Other",
                    },
                  ]}
                />
              </Col>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="email"
                  label="Email"
                />
              </Col>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="mobileNo"
                  label="Mobile No"
                />
              </Col>{" "}
              <Col span={24}>
                <EComInput
                  type="text"
                  name="password"
                  label="Password"
                />
              </Col>
              <Col span={24}>
                <EComProfileImageUploader
                  name="image"
                  label="Image"
                />
              </Col>
            </Row>
            <Button
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
            >
              Register
            </Button>
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
