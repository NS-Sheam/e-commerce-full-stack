import { Button, ButtonProps } from "antd";
import { ReactNode } from "react";

type TCommonBtnProps = ButtonProps & {
  children: ReactNode;
  fields?: any;
  size?: "large" | "middle" | "small";
  backgroundColor?: string;
};

const CommonBtn = ({ children, fields, size, backgroundColor }: TCommonBtnProps) => {
  return (
    <Button
      {...fields}
      size={size || "large"}
      style={{
        width: "100%",
        color: "#ffffff",
        fontWeight: "bold",
        border: `1px solid ${backgroundColor || "#fa8232"}`,
        backgroundColor: backgroundColor || "#fa8232",
        borderRadius: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {children}
    </Button>
  );
};

export default CommonBtn;
