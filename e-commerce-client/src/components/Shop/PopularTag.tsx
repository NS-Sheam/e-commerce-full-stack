import { Tag } from "antd";

type TPopularTagProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PopularTag = ({ setSearchTerm, setPage }: TPopularTagProps) => {
  return (
    <div className="space-y-1 hidden md:block">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Popular Tag</h3>
      <div>
        {["Laptop", "Headphone", "TV", "Smartphone", "Computer", "TV", "Printer", "Keyboard", "Mouse"].map(
          (item, index) => {
            return (
              <Tag
                onClick={() => {
                  setSearchTerm(item);
                  setPage(1);
                }}
                key={index}
                color="default"
                className="font-semibold text-gray m-1 hover:border-orange hover:text-orange cursor-pointer"
              >
                {item}
              </Tag>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PopularTag;
