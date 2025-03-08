import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TPHInputProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
