import { Button, Col, Row, Table, TableColumnsType } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { useAppSelector } from "../../../redux/hooks";
import { useGetProductsQuery } from "../../../redux/features/productManagement/productManagement.api";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "../../../components/ui/QuantitySelector";
import { useState } from "react";

const ShoppingCart = () => {
  const { shoppingCart } = useAppSelector((state) => state.auth);
  const shoppingCartQuery = shoppingCart?.map((id) => ({ name: "_id", value: id }));

  console.log(shoppingCartQuery);

  const { data: productData } = useGetProductsQuery(shoppingCartQuery);

  console.log(productData);

  const navigate = useNavigate();
  const handleNavigateToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };
  const columns: TableColumnsType<any> = [
    {
      title: "PRODUCTS",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      responsive: ["lg"],
    },
    {
      title: "QUANTITY",
      dataIndex: "address",
      responsive: ["lg"],
      render: (_, record) => <QuantitySelector productId={record._id} />,
    },
    {
      title: "SUB-TOTAL",
      dataIndex: "address",
      responsive: ["lg"],
      render: (text) => <span>{text}</span>,
    },
  ];
  return (
    <div className="p-4 space-y-4">
      <DashboardHeading>
        <h3>Shopping Cart</h3>
      </DashboardHeading>
      <Table
        columns={columns}
        dataSource={productData?.data}
      />
      ;
    </div>
  );
};

export default ShoppingCart;
/** 
<Row gutter={[16, 16]}>
{productData?.data?.map((product) => (
  <Col
    key={product._id}
    span={24}
    style={{
      border: "1px solid #e5e5e5",
      padding: "1rem",
    }}
    className="shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
    onClick={() => handleNavigateToProduct(product._id)}
  >
    <Row
      gutter={[16, 16]}
      justify="center"
      align="middle"
    >
      <Col
        span={24}
        md={{ span: 8 }}
      >
        <div className="md:flex items-center justify-start gap-2">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full md:w-32 md:h-20 text-grayBlack"
          />
          <span className="text-2xl md:text-xl font-semibold">{product.name}</span>
        </div>
      </Col>
      <Col
        span={24}
        md={{ span: 4 }}
      >
        <span className="text-[#2DA5F3] font-bold text-xl">${product.price}</span>
      </Col>
      <Col
        span={24}
        md={{ span: 4 }}
      >
        <span className="font-bold text-green-500">IN STOCK</span>
      </Col>

      <Col
        span={24}
        md={{ span: 8 }}
        className="flex items-center justify-center gap-2"
      >
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
          
        </Button>
      </Col>
    </Row>
  </Col>

</Row>
*/
