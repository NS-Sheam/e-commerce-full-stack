import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import EComSelect from "../../components/form/EComSelect";
import { Button, Col, Row } from "antd";

import EComProfileImageUploader from "../../components/form/EComProfileImageUploader";
import { useRegistrationMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";

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
      const res = await registerUser(formData);
      console.log(res);
      if (!res.error) {
        toast.success("Registered successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="inner-container bg-grayWhite py-6 md:py-8 lg:py-10">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col
          span={24}
          md={{ span: 12 }}
        >
          <h1 className="text-2xl font-bold text-center my-4">Register</h1>
          <EComForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <Row gutter={8}>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="userName"
                  label="User Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="name.firstName"
                  label="First Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>

              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="name.lastName"
                  label="Last Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
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
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="email"
                  label="Email"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="mobileNo"
                  label="Mobile No"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComProfileImageUploader
                  name="image"
                  label="Image"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="password"
                  label="Password"
                />
              </Col>
            </Row>
            <Button htmlType="submit">Register</Button>
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default Register;

// {
//     "userName": "customer",
//     "name": {
//       "firstName": "Customer",
//       "middleName": "Nazmus",
//       "lastName": "Sakib"
//     },
//     "gender": "male",
//     "email": "customer@example.com",
//     "mobileNo": "012323232323",
//     "image": "https://example.com/profile.jpg"
//   }
// }
