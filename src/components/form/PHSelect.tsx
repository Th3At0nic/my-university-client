import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  defaultValue?: { value: string; label: string };
};

const PHSelect = ({
  label,
  name,
  options,
  disabled,
  defaultValue,
}: TPHSelectProps) => {
  const { setValue } = useFormContext(); // Accessing the form context

  // Set default value using useEffect after render
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue.value);
    }
  }, [defaultValue, setValue, name]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
