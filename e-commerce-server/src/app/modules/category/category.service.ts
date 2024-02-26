/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (file: any, payload: TCategory) => {
  const { secure_url } = (await sendImageToCloudinary(
    payload.name,
    file?.path,
  )) as any;

  payload.image = secure_url;

  const result = await Category.create(payload);
  return result;
};
const getAllCategories = async (query: Record<string, any>) => {
  const categoriesQuery = new QueryBuilder(Category.find(), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .limit();
  const result = await categoriesQuery.modelQuery;
  const meta = await categoriesQuery.countTotal();
  return { result, meta };
};
const updateCategory = async (id: string, file: any, payload: TCategory) => {
  if (file) {
    const { secure_url } = (await sendImageToCloudinary(
      payload.name,
      file?.path,
    )) as any;
    payload.image = secure_url;
  }
  const result = await Category.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
