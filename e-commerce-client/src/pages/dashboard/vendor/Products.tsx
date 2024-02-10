import { Button, Card, Col, Row } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { FaArrowRight } from "react-icons/fa6";
import Meta from "antd/es/card/Meta";
import { useGetProductsQuery } from "../../../redux/features/productManagement/productManagement.api";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";

const Products = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user?.userId);

  const { data: products, isLoading } = useGetProductsQuery([
    {
      name: "vendor",
      value: user?.userId as string,
    },
  ]);

  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Products</h3>
        <Button style={{ color: "#FF8C00", border: "FF8C00" }}>
          <p className="flex items-center justify-center gap-2">
            <span>Add Product</span>
            <FaArrowRight />
          </p>
        </Button>
      </DashboardHeading>
      <Row gutter={[12, 12]}>
        {products?.data?.map((product) => (
          <Col
            key={product._id}
            span={6}
          >
            <Card
              key={product._id}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src={product.images[0]}
                  style={{ width: 240, height: 200 }}
                />
              }
            >
              <h3 className="text-[#191C1F] font-medium">{product.name}</h3>
              <p className="text-[#2DA5F3] font-semibold">${product.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
// className="flex items-center justify-center gap-2 px-2 text-orange btn link"
