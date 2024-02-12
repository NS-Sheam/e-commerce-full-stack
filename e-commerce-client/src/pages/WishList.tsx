import { Button, Table, TableProps } from "antd";
import DashboardHeading from "../components/ui/DashboardHeading";
import { useGetSingleCustomerQuery } from "../redux/features/userManagement/userManagement.api";
import { TProduct } from "../types/product.type";
import { FaShoppingCart } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const WishList = () => {
  const { data: customerData } = useGetSingleCustomerQuery(undefined);
  const wishList = customerData?.wishList;
  const columns: TableProps<TProduct>["columns"] = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            src={record.images[0]}
            alt={record.name}
            style={{
              width: "80px",
              height: "50px",
            }}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "age",
    },
    {
      title: "Stock Status",
      key: "stock",
      render: (_, record) => (
        <span className={`font-bold ${record.inventory.quantity > 0 ? "text-green-500" : "text-red-600"}`}>
          {record.inventory.quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex items-center justify-center gap-2">
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
            Add to Cart <FaShoppingCart />
          </Button>
          <span className="p-1 cursor-pointer rounded-full border-grayBlack border-2 flex items-center justify-center bg-gray text-white">
            <FaX />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Wishlist</h3>
      </DashboardHeading>
      <Table
        columns={columns}
        dataSource={wishList}
        pagination={false}
      />
    </div>
  );
};

export default WishList;
