import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

type TEComInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
  defaultValue?: string;
  [key: string]: any;
};

const EComInput = ({ type, name, label, disabled, defaultValue, ...remainingProps }: TEComInputProps) => {
  useEffect(() => {}, []);
  return (
    <div>
      <Controller
        name={name}
        defaultValue={defaultValue}
        rules={{ required: "This field is required" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...remainingProps}
              {...field}
              type={type}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default EComInput;
