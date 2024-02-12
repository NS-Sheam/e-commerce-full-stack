import { Card, Tag } from "antd";
import { TProduct } from "../../types/product.type";
import { FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import "../../styles/ProductCard.css";
const ProductCard = ({ product }: { product: TProduct }) => {
  const iconStyle =
    "bg-white hover:bg-orange p-3 flex items-center justify-center rounded-full text-grayBlack hover:text-white text-xl duration-300";
  return (
    <Card
      className="product-card"
      key={product._id}
      hoverable
      style={{ width: "100%" }}
      cover={
        <div style={{ width: "100%", height: 200, position: "relative" }}>
          <div className="card-icon-container">
            <span className={iconStyle}>
              <FaRegHeart />
            </span>
            <span className={iconStyle}>
              {" "}
              <FaShoppingCart />
            </span>
          </div>
          <img
            alt={product.name}
            src={product.images[0]}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      }
    >
      {product.discount && (
        <Tag
          className="absolute top-2 right-0"
          color="#f50"
        >
          {Math.ceil((product?.discount / product?.price) * 100) || 0}% OFF
        </Tag>
      )}
      <h3 className="text-[#191C1F] font-medium">{product.name}</h3>
      <p className="text-[#2DA5F3] font-semibold">${product.price - product?.discount || 0}</p>
    </Card>
  );
};

export default ProductCard;
