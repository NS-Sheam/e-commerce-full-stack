// {
//     "name": "Laptop",
//     "description": "Powerful laptop for professional use",
//     "price": 1200,
//     "images": ["laptop_image1.jpg", "laptop_image2.jpg"],
//     "category": "Electronics",
//     "inventory": {
//       "quantity": 10,
//       "lowSockNotification": "No"
//     },
//     "discount": 100
//   }

import { Button, Col, Row } from "antd";
import EComForm from "../../../components/form/EComForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EComInput from "../../../components/form/EComInput";
import EComSelect from "../../../components/form/EComSelect";
import { useGetCategoriesQuery } from "../../../redux/features/productManagement/productManagement.api";
import EComMultipleImageUploader from "../../../components/form/EComMultipleImageUploader";
import EComTextAreaInput from "../../../components/form/EComTextAreaInput";

const defaultValues = {
  name: "Laptop",
  description: "Powerful laptop for professional use",
  price: 1200,
  // category: "Electronics",
  inventory: {
    quantity: 10,
    lowSockNotification: "No",
  },
  discount: 100,
};
const AddProduct = () => {
  const { data: categories, isLoading: categoryIsLoading } = useGetCategoriesQuery(undefined);

  const categoryOptions = categories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <EComForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
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
