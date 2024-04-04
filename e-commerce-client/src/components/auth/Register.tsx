import { FieldValues, SubmitHandler } from "react-hook-form";
import EComForm from "../form/EComForm";
import EComInput from "../form/EComInput";
import EComSelect from "../form/EComSelect";
import { Button, Col, Row } from "antd";

import EComProfileImageUploader from "../form/EComProfileImageUploader";
import { useLoginMutation, useRegistrationMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";
import { TReduxResponse } from "../../types/global";
import GoogleLoginButton from "../ui/GoogleLoginButton";
import { verifyToken } from "../../utils/verifyToken";
import { TUser, setUser } from "../../redux/features/auth/auth.Slice";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
/** TODO:
 * - Add google Login
 * - Add autmatic login after registration
 * - Automatically redirect to page where user was before login or want to go
 *
 */

const Register = () => {
  const [registerUser] = useRegistrationMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...", { duration: 2000 });
    const userInfo = {
      password: data.password,
      customer: {
        ...data,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userInfo));
    if (data.image) {
      formData.append("file", data.image?.originFileObj);
      delete data.image;
    }
    try {
      const res = (await registerUser(formData)) as TReduxResponse<any>;
      if (!res.error) {
        toast.success("Registered successfully. Check your email for verification link.", {
          id: toastId,
          duration: 2000,
        });
        const loginRes = (await login({ email: data.email, password: data.password })) as TReduxResponse<any>;

        if (!loginRes.error) {
          const user = verifyToken(loginRes.data.data.accessToken) as TUser;

          const data = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
            method: "GET",
            credentials: "include",
            headers: {
              authorization: loginRes.data.data.accessToken,
            },
          });
          const loginInfo = await data.json();

          dispatch(
            setUser({ user: { ...user, image: loginInfo?.data?.image }, token: loginRes.data.data.accessToken })
          );
          navigate("/");
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
    <div className="p-4">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <EComForm onSubmit={onSubmit}>
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
            <GoogleLoginButton />
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
