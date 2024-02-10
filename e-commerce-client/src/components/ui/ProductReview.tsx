import { Rating } from "@smastrom/react-rating";
import { Col, Progress, Row, Tag } from "antd";

const ProductReview = ({ product }) => {
  return (
    <Row
      gutter={[16, 16]}
      justify={"center"}
      align={"top"}
      style={{ padding: "1rem" }}
    >
      <Col
        span={24}
        md={{ span: 8 }}
        className="space-y-2"
      >
        <Row
          gutter={[16, 16]}
          justify={"center"}
          align={"middle"}
        >
          <Col
            span={24}
            md={{ span: 12 }}
            className="space-y-2"
          >
            <div className="flex justify-start items-center gap-2">
              <h3 className="text-7xl">4.4</h3>
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
              value={4}
            />
            <p className="text-grayBlack text-xl ">111 ratings</p>
          </Col>
          <Col
            span={24}
            md={{ span: 12 }}
          >
            <Progress
              percent={60}
              format={() => "5 stars"}
              strokeColor={{
                "100%": "#ebc80c",
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductReview;
