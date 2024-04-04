import { Col, Row } from "antd";
import { useGetProductsQuery } from "../../redux/features/productManagement/productManagement.api";
import ProductCard from "../ui/ProductCard";
import { useEffect } from "react";
import LoadingComponent from "../LoadingComponent";

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

  if (pIsLoading || pIsFetching) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        padding: "1rem",
      }}
      className="h-full"
    >
      <Row
        gutter={[16, 16]}
        justify={"start"}
        align={"top"}
      >
        {products?.map((product) => (
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
        ))}
      </Row>
    </div>
  );
};

export default ShopCardsSide;
