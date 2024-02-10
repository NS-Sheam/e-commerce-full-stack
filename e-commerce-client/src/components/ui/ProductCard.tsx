import { Card, Tag } from "antd";
import { TProduct } from "../../types/product.type";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card
      key={product._id}
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          alt={product.name}
          src={product.images[0]}
          style={{ width: "100%", height: 200 }}
        />
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
