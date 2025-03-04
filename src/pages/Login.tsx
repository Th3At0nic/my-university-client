/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [login] = useLoginMutation();

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: formData.id,
        password: formData.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Logged in successfully", { id: toastId, duration: 2000 });

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error(`Something went wrong..`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input
          style={{ border: "2px solid black", margin: "5px" }}
          type="text"
          id="id"
          {...register("id")}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          style={{ border: "2px solid black", margin: "5px" }}
          type="text"
          id="password"
          {...register("password")}
        />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
