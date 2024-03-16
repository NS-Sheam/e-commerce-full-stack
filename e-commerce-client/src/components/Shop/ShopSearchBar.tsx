import { Col, Input } from "antd";
import { FaMagnifyingGlass } from "react-icons/fa6";

type TShopSearchBarProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const ShopSearchBar = ({ setSearchTerm }: TShopSearchBarProps) => {
  return (
    <Col
      span={12}
      className="shop-searchbar relative w-full"
    >
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Enter your search keyword here..."
        className="w-full h-12 px-4 rounded-sm"
      />
      <div className="absolute inset-y-0 right-0 px-6 flex items-center bg-slate-200 cursor-pointer">
        <FaMagnifyingGlass className={` text-xl lg:text-2xl text-gray`} />
      </div>
    </Col>
  );
};

export default ShopSearchBar;
