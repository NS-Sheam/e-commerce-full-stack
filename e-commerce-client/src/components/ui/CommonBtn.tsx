import { Button, ButtonProps } from "antd";
import { ReactNode } from "react";

type TCommonBtnProps = ButtonProps & {
  children: ReactNode;
};

const CommonBtn = ({ children, ...fields }: TCommonBtnProps) => {
  return (
    <Button
      {...fields}
      size="large"
      style={{
        width: "100%",
        color: "#ffffff",
        fontWeight: "bold",
        border: "2px solid #fa8232",
        backgroundColor: "#fa8232",
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
