import { Button, Col, Row } from "antd";
import EComForm from "../form/EComForm";
import EComInput from "../form/EComInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { verifyToken } from "../../utils/verifyToken";
import { TUser, setUser } from "../../redux/features/auth/auth.Slice";
import GoogleLoginButton from "../ui/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import { TReduxResponse } from "../../types";

const loginCredintial: { [key in "customer" | "vendor" | "admin"]: { email: string; password: string } } = {
  customer: {
    email: "customer123@gmail.com",
    password: "customer123",
  },
  vendor: {
    email: "123sheamfeni@gmail.com",
    password: "123456",
  },
  admin: {
    email: "7582mnsakibs@gmail.com",
    password: "123456",
  },
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = (await login(data)) as TReduxResponse<any>;
      if (!res.error) {
        const user = verifyToken(res.data.data.accessToken) as TUser;

        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: res.data.data.accessToken,
          },
        });
        const userInfo = await data.json();
        dispatch(setUser({ user: { ...user, image: userInfo?.data?.image }, token: res.data.data.accessToken }));

        toast.success("Logged in successfully", { id: toastId, duration: 2000 });
        navigate("/");
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
  return (
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
                  type="text"
                  name="email"
                  label="Email"
                />
              </Col>
              <Col span={24}>
                <EComInput
                  type="text"
                  name="password"
                  label="Password"
                />
                <Button
                  onClick={() => navigate("/auth/forget-password")}
                  type="link"
                  style={{ float: "left", margin: "0 0 0.5rem 0" }}
                >
                  Forgot Password?
                </Button>
              </Col>
            </Row>
            <Button
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
            >
              Login
            </Button>
            {Object.keys(loginCredintial).map((key) => (
              <Button
                key={key}
                onClick={() => {
                  onSubmit(loginCredintial[key as "customer" | "vendor" | "admin"]);
                }}
                style={{
                  width: "100%",
                  margin: "0.5rem 0 0 0",
                  backgroundColor: "#fa8232",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Login as {key}
              </Button>
            ))}
            <GoogleLoginButton />
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
