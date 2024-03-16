import { Col, Tag } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TMeta } from "../../types";
type TShopPaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  meta: TMeta;
};
const ShopPagination = ({ page, setPage, meta }: TShopPaginationProps) => {
  return (
    <Col
      span={24}
      className="flex justify-center items-center gap-3"
    >
      <div
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
        style={{
          border: "2px solid #fa8232",
          borderRadius: "100%",
        }}
        className="flex justify-center items-center cursor-pointer"
      >
        <FaArrowLeft className="text-orange text-3xl p-1" />
      </div>

      {Array.from({ length: meta?.totalPages }).map((_, index) => (
        <Tag
          key={index}
          className="cursor-pointer text-2xl"
          style={{
            border: "2px solid #fa8232",
            backgroundColor: index + 1 === page ? "#fa8232" : "white",
            color: index + 1 === page ? "white" : "black",
            borderRadius: "100%",
          }}
        >
          {index + 1}
        </Tag>
      ))}
      <div
        onClick={() => {
          if (page < meta?.totalPages) {
            setPage(page + 1);
          }
        }}
        style={{
          border: "2px solid #fa8232",
          borderRadius: "100%",
        }}
        className="flex justify-center items-center cursor-pointer"
      >
        <FaArrowRight className="text-orange text-3xl p-1" />
      </div>
    </Col>
  );
};

export default ShopPagination;
