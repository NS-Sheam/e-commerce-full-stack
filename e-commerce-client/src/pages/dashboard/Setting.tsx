import { Button, Col, Row } from "antd";
import DashboardHeading from "../../components/ui/DashboardHeading";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import EComProfileImageUploader from "../../components/form/EComProfileImageUploader";
import { useState } from "react";
import { useGetMyInfoQuery } from "../../redux/features/auth/auth.api";

const Setting = () => {
  const [showImageInput, setShowImageInput] = useState(false);
  const { data: myInfo, isLoading: isMyInfoLoading, isFetching: isMyInfoFetching } = useGetMyInfoQuery(undefined);
  console.log(myInfo);
  if (isMyInfoLoading || isMyInfoFetching) {
    return <div>Loading...</div>;
  }

  const submitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Shopping Cart</h3>
      </DashboardHeading>
      <Row
        justify="center"
        align="top"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <EComForm
            onSubmit={submitHandler}
            defaultValues={myInfo}
          >
            <Col
              span={24}
              md={{ span: 12 }}
            >
              {showImageInput ? (
                <EComProfileImageUploader
                  name="image"
                  label="Image"
                />
              ) : (
                <img
                  src={myInfo?.image}
                  alt="profile"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </Col>
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
              </Col>{" "}
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

export default Setting;
