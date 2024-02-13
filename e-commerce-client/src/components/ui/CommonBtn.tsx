import { Button } from "antd";
import { ReactNode } from "react";

const CommonBtn = ({ children }: { children: ReactNode }) => {
  return (
    <Button
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
