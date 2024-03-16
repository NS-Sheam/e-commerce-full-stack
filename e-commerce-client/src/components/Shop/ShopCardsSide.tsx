import { Col, Flex, Row, Spin } from "antd";
import { useGetProductsQuery } from "../../redux/features/productManagement/productManagement.api";
import ProductCard from "../ui/ProductCard";
import { useEffect } from "react";

type TShopCardsSideProps = {
  searchQuery: any;
  setMeta: any;
};
const ShopCardsSide = ({ searchQuery, setMeta }: TShopCardsSideProps) => {
  const { data: pData, isLoading: pIsLoading, isFetching: pIsFetching } = useGetProductsQuery(searchQuery);

  const products = pData?.data;
  useEffect(() => {
    setMeta(pData?.meta);
  }, [pData, setMeta]);
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        padding: "1rem",
      }}
      className="h-full"
    >
      {}
      <Row
        gutter={[16, 16]}
        justify={"start"}
        align={"top"}
      >
        {pIsLoading || pIsFetching ? (
          <Flex
            justify="center"
            align="center"
            gap="middle"
            className="h-full w-full"
          >
            <Spin size="large" />
          </Flex>
        ) : (
          products?.map((product) => (
            <Col
              key={product._id}
              span={12}
              md={{ span: 6 }}
            >
              <ProductCard
                product={product}
                rating
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ShopCardsSide;
