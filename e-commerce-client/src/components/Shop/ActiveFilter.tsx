import { Col, Tag } from "antd";

type TActiveFilterProps = {
  categories: string[];
  brands: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setBrands: React.Dispatch<React.SetStateAction<string[]>>;
};

const ActiveFilter = ({
  categories,
  brands,

  setCategories,
  setBrands,
}: TActiveFilterProps) => {
  return (
    <Col
      className="hidden md:block"
      span={24}
      md={{ span: 18 }}
    >
      <div>
        Active Filters: &nbsp;
        {categories.length > 0 || brands.length > 0 ? (
          <>
            {categories.map((category, index) => (
              <Tag
                color="#fa8232"
                key={index}
                closable
                onClose={() => {
                  setCategories(categories.filter((c) => c !== category));
                }}
              >
                {category}
              </Tag>
            ))}
            {brands.map((brand, index) => (
              <Tag
                color="#fa8232"
                key={index}
                closable
                onClose={() => {
                  setBrands(brands.filter((b) => b !== brand));
                }}
              >
                {brand}
              </Tag>
            ))}
          </>
        ) : (
          "None"
        )}
      </div>
    </Col>
  );
};

export default ActiveFilter;
