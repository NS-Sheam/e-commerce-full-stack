import { Col, Row } from "antd";
import { useGetProductsQuery } from "../redux/features/productManagement/productManagement.api";

const Home = () => {
  const { data: products, isLoading: productIsLoading } = useGetProductsQuery(undefined);

  const productData = products?.data?.map((product) => product);
  const sortByPriceProducts = productData
    ?.sort((a, b) => (b.discount + 100) / b.price + b.discount - (a.discount + 100) / a.price + a.discount)
    .reverse();

  return (
    <div>
      {/* Banner section  */}
      <Row>
        <Col span={24}>
          <div>
            <h1>Home</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
