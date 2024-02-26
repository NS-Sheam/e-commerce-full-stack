import { Button, ButtonProps } from "antd";
import { ReactNode } from "react";

type TCommonBtnProps = ButtonProps & {
  children: ReactNode;
  size?: "large" | "middle" | "small";
  backgroundColor?: string;
  remaining?: Record<string, unknown>;
};

const CommonBtn = ({ children, size, backgroundColor, ...remaining }: TCommonBtnProps) => {
  return (
    <Button
      {...remaining}
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
