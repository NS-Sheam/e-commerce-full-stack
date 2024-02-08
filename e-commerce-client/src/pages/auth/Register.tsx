import { Controller } from "react-hook-form";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import EComSelect from "../../components/form/EComSelect";
import { Button, Col, Form, Input, Row } from "antd";

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
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="inner-container bg-grayWhite">
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
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                    <Form.Item label="Image">
                      <Input
                        {...field}
                        type="file"
                        {...field}
                        onChange={(e) => onChange(e?.target.files?.[0])}
                      />
                      {error && <small style={{ color: "red" }}>{error.message}</small>}
                    </Form.Item>
                  )}
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
