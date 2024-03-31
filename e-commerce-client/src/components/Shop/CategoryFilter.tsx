import { Checkbox } from "antd";

type TCategoryFilterProps = {
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
};

const CategoryFilter = ({ setter, pageSetter }: TCategoryFilterProps) => {
  const categoryData = [
    "TV",
    "Smartphone",
    "Laptop",
    "Computer",
    "Printer",
    "Keyboard",
    "Mouse",
    "Electronics",
    "Headphone",
    "Home Appliances",
  ];
  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Category</h3>
      <ul className="space-y-1 font-semibold text-gray">
        {categoryData?.map((category, i) => (
          <ol key={i}>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setter((prev) => [...prev, category]);
                } else {
                  setter((prev) => prev.filter((cat) => cat !== category));
                }
                pageSetter(1);
              }}
            >
              {category}
            </Checkbox>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
