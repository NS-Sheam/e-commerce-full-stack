import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/productManagement/productManagement.api";
import { Col, Flex, Row, Spin, Tag } from "antd";

import ProductImageCarousel from "../components/ui/ProductImageCarousel";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaFacebook, FaHeart, FaPinterest, FaRegHeart, FaTwitter } from "react-icons/fa6";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import ProductDetailsTab from "../components/ui/ProductDetailsTab";
import AddToCartBtnComponent from "../components/ui/AddToCartBtnComponent";
import { handleAddToWishList } from "../utils/updateWishList";
import {
  useGetSingleCustomerQuery,
  useUpdateWishListMutation,
} from "../redux/features/userManagement/userManagement.api";
import { TProduct } from "../types/product.type";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: pIsLoading } = useGetSingleProductQuery(id || "");

  if (pIsLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        gap="middle"
        style={{ minHeight: "100vh" }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  const avgProductRating = product?.productReview.length
    ? product?.productReview?.reduce((acc, review) => acc + review.rating, 0) / product.productReview.length
    : 5;

  const productStock = product?.inventory?.quantity || 0;
  const discount = product?.discount && (product?.discount / product?.price) * 100;
  return (
    <div className="inner-container p-4 space-y-4">
      <Row gutter={16}>
        <Col
          span={24}
          md={{ span: 12 }}
        >
          <Row
            gutter={16}
            justify="center"
          >
            <Col span={16}>
              {/* Carousel Component  */}
              <ProductImageCarousel product={product!} />
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          md={{ span: 12 }}
          className="space-y-1"
        >
          <div className="flex items-center justify-start gap-3">
            <Rating
              style={{ maxWidth: 100 }}
              readOnly
              value={avgProductRating}
            />
            <span className="font-semibold text-grayBlack text-xl">{avgProductRating} Star Rating</span>
            <span className="font-bold text-gray">({product?.productReview.length} User Feedback)</span>
          </div>

          <h3 className="text-2xl font-semibold">{product?.name}</h3>
          <div className="text-xl text-gray grid grid-cols-1 md:grid-cols-2">
            <p>
              Brand: <span className="font-bold text-black">{product?.brand}</span>
            </p>
            <p className="md:order-last">
              Category: <span className="font-bold text-black">{product?.category.name}</span>
            </p>
            <p>
              Availablibility:{" "}
              <Tag
                color={productStock >= 30 ? "#108ee9" : productStock <= 10 ? "#f50" : "#f50"}
                style={{ padding: "0.3rem 1rem", fontWeight: "600", fontSize: "1rem" }}
              >
                {productStock >= 30 ? "In Stock" : productStock <= 10 ? "Low Stock" : "Stock out"}
              </Tag>
            </p>
          </div>
          <p className="text-2xl font-bold text-[#2DA5F3] flex justify-start items-center gap-2">
            <span>${product?.price}</span>
            {"  "}
            <span className={`text-xl font-thin text-black line-through`}>
              {product!.price + (product?.discount || 0)}
            </span>
            {discount && <Tag color="#f50">{Math.ceil(discount)}% OFF</Tag>}
          </p>
          <AddToCartBtnComponent product={product!} />
          <WishListComponent product={product!} />
        </Col>
      </Row>
      <ProductDetailsTab product={product!} />
    </div>
  );
};

export default ProductDetails;

export const WishListComponent = ({ product }: { product: TProduct }) => {
  const { data: customerData } = useGetSingleCustomerQuery(undefined);
  const [updateWishList] = useUpdateWishListMutation();
  const wishList = customerData?.wishList;
  const doesWishListContainProduct = wishList?.some((p) => p._id === product._id) as boolean;

  const handleSubmit = async () => {
    await handleAddToWishList({
      productId: product._id,
      doesWishListContainProduct,
      updateFn: updateWishList,
    });
  };
  return (
    <div className="grid grid-cols-7 gap-2 w-full text-gray">
      <span className="col-span-4 md:col-span-2 flex justify-center items-center gap-1">
        {doesWishListContainProduct ? (
          <FaHeart
            onClick={handleSubmit}
            className="text-xl cursor-pointer text-orange"
          />
        ) : (
          <FaRegHeart
            onClick={handleSubmit}
            className="text-xl cursor-pointer text-orange"
          />
        )}{" "}
        Add to Wishlist
      </span>
      <span className="col-span-3 md:col-span-2 flex justify-center items-center gap-1">
        <MdOutlineCompareArrows className="text-xl" /> Add To Compare
      </span>
      <span className="col-span-7 md:col-span-3 flex justify-center items-center gap-1">
        Share Product{" "}
        <span className="text-xl space-x-1 text-orange">
          <FiCopy /> <FaFacebook />
          <FaTwitter />
          <FaPinterest />
        </span>
      </span>
    </div>
  );
};
