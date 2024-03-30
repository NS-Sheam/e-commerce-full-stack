import { Checkbox } from "antd";

type TBrandFilterProps = {
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
  setter: React.Dispatch<React.SetStateAction<string[]>>;
};

const BrandFilter = ({ setter, pageSetter }: TBrandFilterProps) => {
  const popularBrand = ["Samsung", "Apple", "HP", "Logitech", "Dell", "Lenovo", "Havit", "Sony"];
  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Popular Brands</h3>
      <ul className="space-y-1 font-semibold text-gray">
        {popularBrand?.map((brand, index) => (
          <ol key={index}>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setter((prev) => [...prev, brand]);
                } else {
                  setter((prev) => prev.filter((brand) => brand !== brand));
                }
                pageSetter(1);
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
