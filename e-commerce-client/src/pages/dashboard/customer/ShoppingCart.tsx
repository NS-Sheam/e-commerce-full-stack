import { Col, Row, Table, TableColumnsType } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useGetProductsQuery } from "../../../redux/features/productManagement/productManagement.api";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "../../../components/ui/QuantitySelector";
import CartTotalComponent from "../../../components/ui/CartTotalComponent";
import { useEffect, useState } from "react";
import { TProduct } from "../../../types/product.types";
import { subTotalFn } from "../../../utils/subTotal";
import { setOrders } from "../../../redux/features/order/order.Slice";

export type TSubTotal = {
  total: number;
  totalDiscount: number;
};

const ShoppingCart = () => {
  const [subTotal, setSubTotal] = useState<TSubTotal>({
    total: 0,
    totalDiscount: 0,
  });

  const { shoppingCart } = useAppSelector((state) => state.auth);

  const shoppingCartQuery = shoppingCart?.map((id) => ({ name: "_id", value: id }));
  const { data, isFetching: isPFetching } = useGetProductsQuery(shoppingCartQuery);
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const productData = data?.data;

  const navigate = useNavigate();
  const handleNavigateToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };
  const singleProductTotalfn = (id: string) => {
    const productPrice =
      (productData && productData && productData?.find((product: TProduct) => product._id === id)?.price) || 0;
    const totalPrice = products?.filter((product) => product === id).length * productPrice;
    return totalPrice;
  };

  useEffect(() => {
    if (productData) {
      const { total, totalDiscount } = subTotalFn(products, productData);
      setSubTotal({ total, totalDiscount });
    }
  }, [productData, products]);

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
            className="cursor-pointer"
          >
            <Col
              onClick={() => handleNavigateToProduct(record._id)}
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
                Total: ${singleProductTotalfn(record._id)}
              </span>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "PRICE",
      dataIndex: "price",
      responsive: ["md"],
      render: (text) => <span className="text-[#2DA5F3]  font-bold">${text}</span>,
    },
    {
      title: "QUANTITY",
      dataIndex: "address",
      responsive: ["md"],
      render: (_, record) => <QuantitySelector productId={record._id} />,
    },
    {
      title: "SUB-TOTAL",
      dataIndex: "total",
      responsive: ["md"],
      render: (_, record) => (
        <span className="font-bold text-green-500 text-center">Total: ${singleProductTotalfn(record._id)}</span>
      ),
    },
  ];
  const handleNavigateToCheckout = () => {
    dispatch(setOrders([...products]));
    navigate("/checkout");
  };
  return (
    <div className="p-4 space-y-4">
      <DashboardHeading>
        <h3>Shopping Cart</h3>
      </DashboardHeading>
      <Row gutter={[16, 16]}>
        <Col
          span={24}
          md={{ span: 16 }}
        >
          <Table
            columns={columns}
            dataSource={productData}
            loading={isPFetching}
            pagination={false}
            rowKey="_id"
          />
        </Col>
        <Col
          span={24}
          md={{ span: 8 }}
        >
          <CartTotalComponent
            subTotal={subTotal}
            title="Cart Total"
            btnTitle="Proceed to Checkout"
            btnProps={{
              onClick: handleNavigateToCheckout,
            }}
          />
        </Col>
      </Row>
      ;
    </div>
  );
};

export default ShoppingCart;
