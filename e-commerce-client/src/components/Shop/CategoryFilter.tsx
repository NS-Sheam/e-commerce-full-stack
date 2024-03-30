import { Checkbox } from "antd";
import { TCatgeory } from "../../types";

type TCategoryFilterProps = {
  categories: TCatgeory[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
};

const CategoryFilter = ({ categories, setter, pageSetter }: TCategoryFilterProps) => {
  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Category</h3>
      <ul className="space-y-1 font-semibold text-gray">
        {categories?.map((category) => (
          <ol key={category._id}>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setter((prev) => [...prev, category.name]);
                } else {
                  setter((prev) => prev.filter((cat) => cat !== category.name));
                }
                pageSetter(1);
              }}
            >
              {category.name}
            </Checkbox>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
