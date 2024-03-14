import { InputNumber } from "antd";

type TPriceFilterProps = {
  priceRange: { minPrice: number | null; maxPrice: number | null };
  setter: React.Dispatch<React.SetStateAction<{ minPrice: number | null; maxPrice: number | null }>>;
  priceRangeTexts: { text: string; min: number | null; max: number | null }[];
  isAllPriceSelected: boolean;
};

const PriceFilter = ({ priceRange, setter, priceRangeTexts, isAllPriceSelected }: TPriceFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Price Range</h3>
      <div className="flex justify-start items-center gap-2">
        <InputNumber
          placeholder="Min Price"
          onChange={(value) => setter({ ...priceRange, minPrice: value ? value : null })}
          value={priceRange.minPrice}
          className="space-y-1 font-semibold text-gray"
        />
        <InputNumber
          placeholder="Max Price"
          onChange={(value) => setter({ ...priceRange, maxPrice: value ? value : null })}
          value={priceRange.maxPrice}
          className="space-y-1 font-semibold text-gray"
        />
      </div>
      <ul className="space-y-1 font-semibold text-gray">
        {priceRangeTexts.map(({ text, min, max }, index) => (
          <li
            key={index}
            className="flex justify-start items-center gap-2"
            onClick={() => setter({ minPrice: min, maxPrice: max })}
          >
            <div
              style={{
                border: isAllPriceSelected
                  ? text === "All Price"
                    ? "2px solid #fa8232"
                    : "1px solid #000000"
                  : priceRange.minPrice === min && priceRange.maxPrice === max
                  ? "2px solid #fa8232"
                  : "1px solid #000000",
              }}
              className="h-4 w-4 rounded-full bg-white"
            ></div>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceFilter;
