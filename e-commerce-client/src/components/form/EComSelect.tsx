import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TEComSelectProps = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
  loading?: boolean;
};

const EComSelect = ({ label, name, options, disabled, mode, loading }: TEComSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={mode}
            options={options}
            disabled={disabled}
            loading={loading}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default EComSelect;
