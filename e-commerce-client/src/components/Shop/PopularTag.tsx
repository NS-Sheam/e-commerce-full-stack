import { Tag } from "antd";

const PopularTag = () => {
  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold uppercase text-grayBlack">Popular Tag</h3>
      <div>
        {[
          "Game",
          "Phone",
          "Laptop",
          "Camera",
          "Watch",
          "Headphone",
          "TV",
          "Smartphone",
          "Computer",
          "Camera",
          "Watch",
          "Headphone",
          "TV",
          "Smartphone",
        ].map((item, index) => {
          return (
            <Tag
              key={index}
              color="default"
              className="font-semibold text-gray m-1 hover:border-orange hover:text-orange cursor-pointer"
            >
              {item}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTag;
