import { Col, Input, Row } from "antd";
import CommonBtn from "../CommonBtn";

const Subscribe = () => {
  return (
    <Row
      gutter={[16, 16]}
      justify="center"
      align="middle"
      className="bg-[#1B6392] p-5 md:p-16"
    >
      <Col
        span={24}
        md={{ span: 13 }}
        className="space-y-2 md:space-y-4 "
      >
        <h3 className="text-white text-2xl md:text-4xl text-center">Subscribe to our newsletter</h3>
        <p className="text-white text-center md:text-xl">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. Donec non quam urna.
          Quisque vitae porta ipsum.
        </p>

        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-sm"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <CommonBtn>Subscribe</CommonBtn>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Subscribe;
