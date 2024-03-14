import { Checkbox } from "antd";
import { TProduct } from "../../types";

type TBrandFilterProps = {
  products: TProduct[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
};

const BrandFilter = ({ products, setter }: TBrandFilterProps) => {
  console.log(products);

  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Popular Brands</h3>
      <ul className="space-y-1 font-semibold text-gray">
        {products?.map((product) => (
          <ol key={product._id}>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setter((prev) => [...prev, product.brand]);
                } else {
                  setter((prev) => prev.filter((brand) => brand !== product.brand));
                }
              }}
            >
              {product.brand}
            </Checkbox>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
