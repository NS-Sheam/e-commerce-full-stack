import { FaArrowRight } from "react-icons/fa6";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Button, Col, Flex, Row, Spin } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import GenericModal from "../../../components/ui/GenericModal";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CommonBtn from "../../../components/ui/CommonBtn";
import { useGetCategoriesQuery } from "../../../redux/features/productManagement/productManagement.api";
import CategoryForm from "../../../components/ui/CategoryForm";
import { TCatgeory } from "../../../types/product.type";
/**
 * FIXME: When click edit button once default value is setting but when chick another edit button then the default value is remain same
 */
const Categories = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: categories, isLoading: cIsLoading } = useGetCategoriesQuery(undefined);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [defaltCategory, setDefaultCategory] = useState<TCatgeory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleAddCategory: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setDefaultCategory(null);
  };

  return (
    <div className="p-4">
      <DashboardHeading>
        <h3>Categories</h3>
        {user?.userType === "admin" && (
          <Button
            onClick={() => {
              setAction("add");
              handleModalOpen();
            }}
            style={{ color: "#FF8C00", border: "FF8C00" }}
          >
            <p className="flex items-center justify-center gap-2">
              <span>Add Category</span>
              <FaArrowRight />
            </p>
          </Button>
        )}
      </DashboardHeading>
      {cIsLoading && (
        <Flex
          justify="center"
          align="center"
          gap="middle"
        >
          <Spin size="large" />
        </Flex>
      )}
      <GenericModal
        title={action === "add" ? "Add Category" : "Edit Category"}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <CategoryForm
          defaultValues={defaltCategory}
          action={action}
          handlerFn={handleAddCategory}
        />
      </GenericModal>
      <Row gutter={[16, 16]}>
        {categories?.map((item) => (
          <Col
            key={item?._id}
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
                    src={item?.image}
                    alt={"product.name"}
                    className="w-full h-full text-grayBlack"
                  />
                </div>
              </Col>

              <Col span={24}>
                <span className="text-2xl md:text-xl font-semibold">{item?.name}</span>
              </Col>

              <Col
                span={24}
                className="flex items-center justify-center gap-2"
              >
                <CommonBtn
                  onClick={() => {
                    setDefaultCategory(item);
                    setAction("edit");
                    handleModalOpen();
                  }}
                  size="small"
                >
                  edit
                </CommonBtn>
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
