import { Table, TableProps } from "antd";
import DashboardHeading from "../components/ui/DashboardHeading";
import { useGetSingleCustomerQuery } from "../redux/features/userManagement/userManagement.api";
import { TProduct } from "../types/product.type";

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
            gap: "10px",
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
      render: (_, record) => <span>{record.inventory.quantity}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <p>dfdf</p>,
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
