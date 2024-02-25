import { FaArrowRight } from "react-icons/fa6";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Button, Col, Row } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import GenericModal from "../../../components/ui/GenericModal";
import { useState } from "react";
import EComForm from "../../../components/form/EComForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EComInput from "../../../components/form/EComInput";
import EComProfileImageUploader from "../../../components/form/EComProfileImageUploader";

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
                label="Category Name"
              />
            </Col>
            <Col span={24}>
              <Button htmlType="submit">Add Category</Button>
            </Col>
          </Row>
        </EComForm>
      </GenericModal>
    </div>
  );
};

export default Categories;
