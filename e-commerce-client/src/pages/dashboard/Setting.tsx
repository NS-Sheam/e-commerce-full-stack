import { Button, Col, Flex, Row } from "antd";
import DashboardHeading from "../../components/ui/DashboardHeading";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import EComProfileImageUploader from "../../components/form/EComProfileImageUploader";
import { useGetMyInfoQuery } from "../../redux/features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Setting = () => {
  const navigate = useNavigate();
  const { data: myInfo, isLoading: isMyInfoLoading, isFetching: isMyInfoFetching } = useGetMyInfoQuery(undefined);
  if (isMyInfoLoading || isMyInfoFetching) {
    return <div>Loading...</div>;
  }



  const defaultValues = {
    userName: myInfo?.userName,
    name: {
      firstName: myInfo?.name?.firstName,
      middleName: myInfo?.name?.middleName,
      lastName: myInfo?.name?.lastName,
    },
    email: myInfo?.email,
    mobileNo: myInfo?.mobileNo,
  };

  const submitHandler: SubmitHandler<FieldValues> = async(data) => {
    const userInfo = myInfo?.user?.
  };
  return (
    <div className="p-4 space-y-4">
      <DashboardHeading>
        <h3>Setting</h3>
      </DashboardHeading>
      <Row
        justify="center"
        align="top"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <EComForm
            onSubmit={submitHandler}
            defaultValues={defaultValues}
          >
            <Col
              span={24}
              md={{ span: 12 }}
            >
              <EComProfileImageUploader
                name="image"
                defaultImageUrl={myInfo?.image}
              />
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
            <Flex
              justify="space-between"
              align="middle"
              gap="middle"
            >
              <Button
                onClick={() => {
                  navigate("/auth/change-password");
                }}
                style={{ width: "20%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
              >
                Change Password
              </Button>
              <Button
                htmlType="submit"
                style={{ width: "20%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
              >
                Update
              </Button>
            </Flex>
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
