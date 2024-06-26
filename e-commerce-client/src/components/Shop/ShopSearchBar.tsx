import { Col, Input } from "antd";
import { FaMagnifyingGlass } from "react-icons/fa6";

type TShopSearchBarProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  [key: string]: any;
};

const ShopSearchBar = ({ setSearchTerm, ...remaining }: TShopSearchBarProps) => {
  return (
    <Col
      span={24}
      md={{ span: 12 }}
      className="shop-searchbar relative w-full"
    >
      <Input
        {...remaining}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="w-full h-12 px-4 rounded-sm"
      />
      <div className="absolute inset-y-0 right-0 px-6 flex items-center bg-slate-200 cursor-pointer">
        <FaMagnifyingGlass className={` text-xl lg:text-2xl text-gray`} />
      </div>
    </Col>
  );
};

export default ShopSearchBar;
