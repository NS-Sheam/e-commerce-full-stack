import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

type TEComInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
};

const EComInput = ({ type, name, label, disabled }: TEComInputProps) => {
  useEffect(() => {}, []);
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
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
