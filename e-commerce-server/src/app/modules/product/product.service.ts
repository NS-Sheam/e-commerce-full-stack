import { JwtPayload } from "jsonwebtoken";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.const";

const getAllProducts = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate()
    .fields();

  const result = await resultQuery.modelQuery;
  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const createProduct = async (payload: TProduct, user: JwtPayload) => {
  payload.vendor = user.userId;

  const result = await Product.create(payload);
  return result;
};

const updateProduct = async (
  productId: string,
  payload: Partial<TProduct>,
  user: JwtPayload,
) => {
  const { images, inventory, ...remaining } = payload;
  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  const product = await Product.findById(productId);

  // check if product exists or not and if the user is the owner of the product
  // it give not found error if products isDeleted is true check the model
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (product.vendor.toString() !== user.userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this product",
    );
  }

  if (images && images.length && product) {
    const modifiedImages: string[] = [...product.images];
    images.forEach((image) => {
      if (!product.images.includes(image)) {
        modifiedImages.push(image);
      }
    });
    modifiedObject.images = modifiedImages;
  }

  if (inventory && Object.keys(inventory).length) {
    for (const [key, value] of Object.entries(inventory)) {
      modifiedObject[`inventory.${key}`] = value;
    }
  }

  const result = await Product.findByIdAndUpdate(productId, modifiedObject, {
    new: true,
  });
  return result;
};

const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
