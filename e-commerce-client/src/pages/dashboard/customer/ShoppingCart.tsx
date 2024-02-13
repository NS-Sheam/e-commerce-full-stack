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

  const { data: productData, isLoading: isPLoading } = useGetProductsQuery(shoppingCartQuery);
  const { products } = useAppSelector((state) => state.product);

  const navigate = useNavigate();
  const handleNavigateToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  const productTotal = (id: string) => {
    const productPrice =
      (productData?.data &&
        productData.data.length &&
        productData?.data.find((product) => product._id === id)?.price) ||
      0;
    const totalPrice = products?.filter((product) => product === id).length * productPrice;
    return totalPrice;
  };

  const columns: TableColumnsType<any> = [
    {
      title: "PRODUCTS",
      dataIndex: "name",
      render: (_, record) => {
        return (
          <Row
            gutter={[16, 16]}
            justify="center"
            align="middle"
          >
            <Col
              span={10}
              md={{ span: 24 }}
            >
              <div className="flex items-center justify-start gap-2">
                <img
                  src={record.images[0]}
                  alt={record.name}
                  className="w-8 h-4 md:w-32 md:h-20 text-grayBlack"
                />
                <span className="text-xs md:text-xl font-semibold">{record.name}</span>
              </div>
            </Col>
            <Col
              span={4}
              md={{ span: 4 }}
              className="md:hidden"
            >
              <p className="text-[#2DA5F3] font-bold text-[8px] text-center">Price: ${record.price}</p>
            </Col>
            <Col
              span={6}
              md={{ span: 4 }}
              className="md:hidden"
            >
              <QuantitySelector productId={record._id} />
            </Col>
            <Col
              span={4}
              md={{ span: 4 }}
              className="md:hidden"
            >
              <span className="font-bold text-green-500 text-[8px] text-center">
                Total: ${productTotal(record._id)}
              </span>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "PRICE",
      dataIndex: "price",
      responsive: ["lg"],
      render: (text) => <span className="text-[#2DA5F3]  font-bold">${text}</span>,
    },
    {
      title: "QUANTITY",
      dataIndex: "address",
      responsive: ["lg"],
      render: (_, record) => <QuantitySelector productId={record._id} />,
    },
    {
      title: "SUB-TOTAL",
      dataIndex: "total",
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
        rowKey={(record) => record._id}
      />
      ;
    </div>
  );
};

export default ShoppingCart;
