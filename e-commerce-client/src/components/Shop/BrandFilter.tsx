import { Checkbox } from "antd";

type TBrandFilterProps = {
  brands: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
};

const BrandFilter = ({ brands, setter }: TBrandFilterProps) => {
  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Popular Brands</h3>
      <ul className="space-y-1 font-semibold text-gray">
        {brands?.map((brand, index) => (
          <ol key={index}>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setter((prev) => [...prev, brand]);
                } else {
                  setter((prev) => prev.filter((brand) => brand !== brand));
                }
              }}
            >
              {brand}
            </Checkbox>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
