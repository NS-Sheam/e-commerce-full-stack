import { FaArrowRight } from "react-icons/fa6";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Button, Col, Flex, Row } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import GenericModal from "../../../components/ui/GenericModal";
import { useState } from "react";
import EComForm from "../../../components/form/EComForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EComInput from "../../../components/form/EComInput";
import EComProfileImageUploader from "../../../components/form/EComProfileImageUploader";
import image from "../../../assets/images/football-shoe.jpeg";
import CommonBtn from "../../../components/ui/CommonBtn";

const Categories = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleAddCategory: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Categories</h3>
        {user?.userType === "admin" && (
          <Button
            onClick={handleModalOpen}
            style={{ color: "#FF8C00", border: "FF8C00" }}
          >
            <p className="flex items-center justify-center gap-2">
              <span>Add Category</span>
              <FaArrowRight />
            </p>
          </Button>
        )}
      </DashboardHeading>
      <GenericModal
        title="Add Category"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <EComForm onSubmit={handleAddCategory}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <EComInput
                type="text"
                name="category"
                label="Category Name"
              />
            </Col>
            <Col span={24}>
              <EComProfileImageUploader
                name="image"
                label="Image"
              />
            </Col>
            <Col span={24}>
              <Flex justify="end">
                <Button
                  className="add-category-submit-button bg-[#FF8C00] text-white"
                  htmlType="submit"
                >
                  Add Category
                </Button>
              </Flex>
            </Col>
          </Row>
        </EComForm>
      </GenericModal>
      <Row gutter={[16, 16]}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Col
            key={index}
            span={12}
            md={{ span: 8 }}
            lg={{ span: 4 }}
            style={{
              border: "1px solid #e5e5e5",
              padding: "1rem",
            }}
            className="shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
          >
            <Row
              gutter={[16, 16]}
              justify="center"
              align="middle"
            >
              <Col span={24}>
                <div className="md:flex items-center justify-start gap-2">
                  <img
                    src={image}
                    alt={"product.name"}
                    className="w-full h-full text-grayBlack"
                  />
                </div>
              </Col>

              <Col span={24}>
                <span className="text-2xl md:text-xl font-semibold">name</span>
              </Col>

              <Col
                span={24}
                className="flex items-center justify-center gap-2"
              >
                <CommonBtn size="small">edit</CommonBtn>
              </Col>
              <Col
                span={24}
                className="flex items-center justify-center gap-2"
              >
                <CommonBtn
                  backgroundColor="#FF6347"
                  size="small"
                >
                  delete
                </CommonBtn>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
