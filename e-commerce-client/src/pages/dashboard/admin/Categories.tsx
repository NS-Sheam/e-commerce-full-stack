import { FaArrowRight } from "react-icons/fa6";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Button, Col, Flex, Row, Spin } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import GenericModal from "../../../components/ui/GenericModal";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CommonBtn from "../../../components/ui/CommonBtn";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/productManagement/productManagement.api";
import CategoryForm from "../../../components/ui/CategoryForm";
import { TCatgeory } from "../../../types/product.types";
import { toast } from "sonner";
import { TReduxResponse } from "../../../types/global";
/**
 * FIXME: When click edit button once default value is setting but when chick another edit button then the default value is remain same
 * TODO: make update category
 */
const Categories = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: categories, isLoading: cIsLoading } = useGetCategoriesQuery(undefined);
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [action, setAction] = useState<"add" | "edit">("add");
  const [defaltCategory, setDefaultCategory] = useState<TCatgeory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleCategory: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Category...");

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (data.image) formData.append("file", data.image?.originFileObj);

    try {
      const res = (await addCategory(formData)) as TReduxResponse<TCatgeory>;
      if (!res.error) {
        toast.success(res.message || "Category added successfully", { id: toastId, duration: 2000 });
      } else {
        toast.error(res.error.data.errorSources[0].message || res.error.message || "Category adding failed", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Category adding failed", { id: toastId, duration: 2000 });
    }
    setDefaultCategory(null);
    setIsModalOpen(false);
  };
  const handleDeleteCategory = async (id: string) => {
    const toastId = toast.loading("Deleting Category...");

    try {
      const res = (await deleteCategory(id)) as TReduxResponse<TCatgeory>;
      console.log(res);
      if (!res.error) {
        toast.success(res.message || "Category deleted successfully", { id: toastId, duration: 2000 });
      } else {
        toast.error(res.error.data.errorSources[0].message || res.error.message || "Category deletion failed", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Category deletion failed", { id: toastId, duration: 2000 });
    }
    setDefaultCategory(null);
    setIsModalOpen(false);
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
          handlerFn={handleCategory}
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
                  onClick={() => handleDeleteCategory(item?._id)}
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
