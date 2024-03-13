import { Rating } from "@smastrom/react-rating";
import { Col, Progress, Row, Tag } from "antd";
import { TProduct } from "../../types/product.types";
/**
 * TODO:
 * 1. Complete product review component
 * 2. Show product review
 * 3. Show average rating
 * 4. Show rating progress bar
 * 5. Show total rating count
 * 6. Show individual rating count
 * 7. Show individual rating progress bar
 * 8. Show individual rating percentage
 * 9. Show individual rating count
 */
const ProductReview = ({ product }: { product: TProduct }) => {
  const avgProductRating = product?.productReview.length
    ? product?.productReview?.reduce((acc, review) => acc + review.rating, 0) / product.productReview.length
    : 5;

  return (
    <Row
      gutter={[16, 16]}
      align={"top"}
      style={{ padding: "2rem 1rem", borderBottom: "2px solid #E4E7E9" }}
    >
      <Col
        span={24}
        md={{ span: 12 }}
        className="space-y-2 flex flex-col justify-center items-start md:items-start"
      >
        <div className="flex justify-start items-center gap-2">
          <h3 className="text-7xl">{avgProductRating ?? 5}</h3>
          <Tag
            style={{ fontSize: "1.4rem", padding: "0.6rem 1.4rem", fontWeight: "600" }}
            color="#ebc80c"
          >
            Very good
          </Tag>
        </div>
        <Rating
          style={{ maxWidth: 150 }}
          readOnly
          value={avgProductRating}
        />
        <p className="text-grayBlack text-xl ">111 ratings</p>
      </Col>
      <Col
        span={24}
        md={{ span: 12 }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2"
          >
            <Rating
              style={{ maxWidth: 150 }}
              readOnly
              value={Math.ceil(avgProductRating)}
            />
            <Progress
              percent={(100 / 5) * Math.ceil(avgProductRating)}
              format={() => `${5 - index} star`}
              strokeColor={{
                "0%": "#ebc80c",
                "100%": "#ebc80c",
              }}
            />
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default ProductReview;
