import { Button, Col, Row } from "antd";
import EComForm from "../../../components/form/EComForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EComInput from "../../../components/form/EComInput";
import EComSelect from "../../../components/form/EComSelect";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/productManagement/productManagement.api";
import EComMultipleImageUploader from "../../../components/form/EComMultipleImageUploader";
import EComTextAreaInput from "../../../components/form/EComTextAreaInput";
import { toast } from "sonner";
import { TReduxResponse } from "../../../types/global";
import { TProduct } from "../../../types/product.type";

/**
 * TODO:
 * - Reset the image uploader after adding product
 * - Navigate to the product page after adding product
 * - Error handling more specific
 */

const AddProduct = () => {
  const { data: categories, isLoading: categoryIsLoading } = useGetCategoriesQuery(undefined);
  const [addProduct] = useAddProductMutation();
  const categoryOptions = categories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Product...");
    const productInfo = {
      ...data,
      price: Number(data.price),
      inventory: {
        quantity: Number(data.inventory.quantity),
        lowSockNotification: data.inventory.lowSockNotification,
      },
      discount: Number(data.discount),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(productInfo));

    await data?.images?.forEach((image: any) => {
      formData.append("file", image);
    });
    try {
      const res = (await addProduct(formData)) as TReduxResponse<TProduct>;

      if (!res.error) {
        toast.success(res.message || "Product added successfully", { id: toastId, duration: 2000 });
      } else {
        toast.error(res.error.message || "Product adding failed", { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error(error.message || "Product adding failed", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="p-4">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <EComForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <Col span={24}>
                  <EComInput
                    type="text"
                    name="name"
                    label="Product Name"
                  />
                </Col>
                <Col span={24}>
                  <EComSelect
                    label="Category"
                    name="category"
                    loading={categoryIsLoading}
                    options={categoryOptions!}
                  />
                </Col>
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComTextAreaInput
                  name="description"
                  label="Description"
                  placeholder="Product Description..."
                />
              </Col>

              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="price"
                  label="Price"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="inventory.quantity"
                  label="Quantity"
                />
              </Col>

              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComSelect
                  label="Low Stock Notification"
                  name="inventory.lowSockNotification"
                  defaultValue="No"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                    {
                      value: "No",
                      label: "No",
                    },
                  ]}
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComInput
                  type="text"
                  name="discount"
                  label="Discount"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <EComMultipleImageUploader
                  name="images"
                  label="Images"
                />
              </Col>
            </Row>
            <Row justify="start">
              <Button
                htmlType="submit"
                style={{ backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
              >
                Add Product
              </Button>
            </Row>
          </EComForm>
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;
