import { Button, Col, Flex, Row, Spin } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { FaArrowRight } from "react-icons/fa6";
import { useGetProductsQuery } from "../../../redux/features/productManagement/productManagement.api";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import ProductCard from "../../../components/ui/ProductCard";
import ShopSearchBar from "../../../components/Shop/ShopSearchBar";
import { TQueryParams } from "../../../types";
import { useState } from "react";
import ShopPagination from "../../../components/Shop/ShopPagination";

const Products = () => {
  const user = useAppSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const searchQuery: TQueryParams[] = [
    {
      name: "limit",
      value: 2 + "",
    },
    {
      name: "page",
      value: page + "",
    },
  ];
  if (searchTerm) {
    searchQuery.push({
      name: "searchTerm",
      value: searchTerm,
    });
  }

  const { data: products, isLoading: pIsLoading, isFetching: pIsFetching } = useGetProductsQuery(searchQuery);

  return (
    <div className="p-4">
      <DashboardHeading>
        <ShopSearchBar setSearchTerm={setSearchTerm} />

        {user?.userType === "vendor" && (
          <Button style={{ color: "#FF8C00", border: "FF8C00" }}>
            <p className="flex items-center justify-center gap-2">
              <span>Add Product</span>
              <FaArrowRight />
            </p>
          </Button>
        )}
      </DashboardHeading>

      <Row
        gutter={[12, 12]}
        style={{ padding: "14px 0" }}
      >
        {pIsFetching || pIsLoading ? (
          <Flex
            justify="center"
            align="center"
            gap="middle"
          >
            <Spin size="large" />
          </Flex>
        ) : (
          products?.data?.map((product) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              key={product._id}
            >
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
      <ShopPagination
        page={page}
        setPage={setPage}
        meta={products?.meta && (products.meta! as any)}
      />
    </div>
  );
};

export default Products;
