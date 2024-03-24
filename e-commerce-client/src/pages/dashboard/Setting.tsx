import { Button, Col, Flex, Row } from "antd";
import DashboardHeading from "../../components/ui/DashboardHeading";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import EComProfileImageUploader from "../../components/form/EComProfileImageUploader";
import { useGetMyInfoQuery } from "../../redux/features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser, setUser, useCurrentToken } from "../../redux/features/auth/auth.Slice";
import { useUpdateCustomerMutation } from "../../redux/features/customer/customer.api";
import { useUpdateVendorMutation } from "../../redux/features/vendor/vendor.api";
import { toast } from "sonner";
import { TAdmin, TCustomer, TReduxResponse, TVendor } from "../../types";
import { useUpdateAdminMutation } from "../../redux/features/admin/admin.api";

const Setting = () => {
  const navigate = useNavigate();
  const { data: myInfo, isLoading: isMyInfoLoading, isFetching: isMyInfoFetching } = useGetMyInfoQuery(undefined);

  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const [updateCustomer] = useUpdateCustomerMutation();
  const [updateVendor] = useUpdateVendorMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const dispatch = useAppDispatch();
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
    image: myInfo?.image,
  };

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating profile...", { duration: 2000 });
    const userInfo: Record<string, unknown> = {};
    userInfo[user?.userType as string] = { ...data };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userInfo));

    if (data.image) formData.append("file", data.image?.originFileObj);
    try {
      const res =
        user?.userType === "customer"
          ? ((await updateCustomer(formData)) as TReduxResponse<TCustomer>)
          : user?.userType === "vendor"
          ? ((await updateVendor(formData)) as TReduxResponse<TVendor>)
          : ((await updateAdmin(formData)) as TReduxResponse<TAdmin>);

      if (!res.error) {
        if (data?.image) {
          dispatch(setUser({ user: { ...user, image: res?.data?.image }, token }));
        }
        if (user?.email !== res?.data?.email) {
          toast.success("Profile updated successfully. Please login again", { id: toastId, duration: 2000 });

          dispatch(logOut());
          navigate("/auth/login");
        } else {
          toast.success("Profile updated successfully ", { id: toastId, duration: 2000 });
        }
      } else {
        toast.error(res?.error?.data?.errorSources[0].message || res.error.message || "Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId, duration: 2000 });
    }
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
