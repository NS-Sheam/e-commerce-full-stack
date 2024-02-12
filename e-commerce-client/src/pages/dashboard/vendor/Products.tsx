import { Button, Col, Flex, Row, Spin } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { FaArrowRight } from "react-icons/fa6";
import { useGetProductsQuery } from "../../../redux/features/productManagement/productManagement.api";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import ProductCard from "../../../components/ui/ProductCard";
import { Link } from "react-router-dom";

const Products = () => {
  const user = useAppSelector(selectCurrentUser);

  const { data: products, isLoading: pIsLoading } = useGetProductsQuery(undefined);
  //   [
  //   {
  //     name: "vendor",
  //     value: user?.userId as string,
  //   },
  // ]

  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Products</h3>
        {user?.userType === "vendor" && (
          <Button style={{ color: "#FF8C00", border: "FF8C00" }}>
            <p className="flex items-center justify-center gap-2">
              <span>Add Product</span>
              <FaArrowRight />
            </p>
          </Button>
        )}
      </DashboardHeading>
      {pIsLoading && (
        <Flex
          justify="center"
          align="center"
          gap="middle"
        >
          <Spin size="large" />
        </Flex>
      )}
      <Row
        gutter={[12, 12]}
        style={{ padding: "14px 0" }}
      >
        {products?.data?.map((product) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={product._id}
          >
            <Link to={`/product/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
