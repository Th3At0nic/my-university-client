/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

// type TLoginFormData = {
//   id: string;
//   password: string;
// };

const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [login, { data, error }] = useLoginMutation();

  console.log("data => ", data);
  console.log("error => ", error);

  const onSubmit = async (useData: any) => {
    console.log("login Data: ", useData);
    const userInfo = {
      id: useData.id,
      password: useData.password,
    };
    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
