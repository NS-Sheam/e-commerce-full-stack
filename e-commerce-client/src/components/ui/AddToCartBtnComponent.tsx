import { Button, Tag } from "antd";

const AddToCartBtnComponent = () => {
  return (
    <div>
      <Tag style={{ padding: "0.3rem 0", fontWeight: "600", fontSize: "1.2rem" }}>
        <span
          style={{ fontSize: "1.5rem", borderRight: "1px solid #5f6c72", padding: "0 0.5rem" }}
          className="cursor-pointer"
        >
          -
        </span>{" "}
        <span className="px-2">3</span>
        <span
          style={{ fontSize: "1.5rem", borderLeft: "1px solid #5f6c72", padding: "0 0.5rem" }}
          className="cursor-pointer"
        >
          +
        </span>
      </Tag>

      <Button
        size="large"
        style={{
          width: "100%",
          color: "#ffffff",
          fontWeight: "bold",
          border: "2px solid #fa8232",
          backgroundColor: "#fa8232",
          borderRadius: "0",
        }}
      >
        Add to Cart
      </Button>
      <Button
        size="large"
        style={{ color: "#fa8232", fontWeight: "bold", border: "2px solid #fa8232" }}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default AddToCartBtnComponent;
