import { Button, Col, Flex, Row } from "antd";
import EComForm from "../form/EComForm";
import EComInput from "../form/EComInput";
import EComProfileImageUploader from "../form/EComProfileImageUploader";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TCategoryFormProps = {
  action: "add" | "edit";
  handlerFn: SubmitHandler<FieldValues>;
  defaultValues?: any;
};

const CategoryForm = ({ action, handlerFn, defaultValues }: TCategoryFormProps) => {
  return (
    <EComForm
      defaultValues={defaultValues}
      onSubmit={handlerFn}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <EComInput
            type="text"
            name="name"
            label="Category Name"
          />
        </Col>
        <Col span={24}>
          <EComProfileImageUploader
            defaultImageUrl={defaultValues?.image}
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
              {action === "add" ? "Add Category" : "Update Category"}
            </Button>
          </Flex>
        </Col>
      </Row>
    </EComForm>
  );
};

export default CategoryForm;
