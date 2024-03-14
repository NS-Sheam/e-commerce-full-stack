import { Checkbox, Col, InputNumber, Row } from "antd";
import { useGetCategoriesQuery } from "../redux/features/productManagement/productManagement.api";

const Shop = () => {
  const { data: cData, isLoading: isCLoading, isFetching: isCFetching } = useGetCategoriesQuery(undefined);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  if (isCLoading || isCFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      {/* Filter section  */}
      <Col span={6}>
        <div>
          <h3>Category</h3>
          <ul>
            {cData?.map((category) => (
              <li key={category.id}>
                <Checkbox>{category.name}</Checkbox>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Price Range</h3>
          <div className="flex justify-start items-center gap-2">
            <InputNumber placeholder="Min Price" />
            <InputNumber placeholder="Max Price" />
          </div>
          <ul>
            <li className="flex justify-start items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              0-100
            </li>
            <li>
              <Checkbox>100 - 200</Checkbox>
            </li>
            <li>
              <Checkbox>200 - 300</Checkbox>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Shop;
