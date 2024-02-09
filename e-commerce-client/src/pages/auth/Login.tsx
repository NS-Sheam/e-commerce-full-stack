import { Button, Col, Row } from "antd";
import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { verifyToken } from "../../utils/verifyToken";
import { TUser, setUser } from "../../redux/features/auth/auth.Slice";

const defaultValues = {
  email: "admin@example.com",
  password: "admin123",
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res: any = await login(data);
      if (!res.error) {
        const user = verifyToken(res.data.data.accessToken) as TUser;

        dispatch(setUser({ user, token: res.data.data.accessToken }));
        toast.success("Logged in successfully", { id: toastId });
      } else {
        toast.error(res.error.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
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
          lg={{ span: 8 }}
        >
          <h1 className="text-2xl font-bold text-center my-4">Login</h1>
          <EComForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
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
              </Col>
            </Row>
            <Button htmlType="submit">Login</Button>
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
