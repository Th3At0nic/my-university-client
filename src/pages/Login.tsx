/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser, TUserFromToken } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (formData: FieldValues) => {
    console.log(formData);
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: formData.id,
        password: formData.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUserFromToken;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Logged in successfully", { id: toastId, duration: 2000 });

      console.log("res login: ", res);

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error(`Something went wrong`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", backgroundColor: "gray" }}
    >
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="id" label="ID " />
        <PHInput type="text" name="password" label="Password " />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
