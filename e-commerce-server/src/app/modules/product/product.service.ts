/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.const";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { Vendor } from "../vendor/vendor.model";
import { Category } from "../category/category.model";
//TODO: Populate review and rating
const getAllProducts = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(
    Product.find().populate("category"),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate()
    .fields()
    .priceRange();

  if (query.category) {
    const categories = Object.values((query.category as string).split(","));

    const categoryIds = await Category.find({
      name: { $in: categories },
    }).select("_id");

    resultQuery.modelQuery.find({ category: { $in: categoryIds } });
  }

  const result = await resultQuery.modelQuery;

  const meta = await resultQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId).populate(
    "category productReview",
  );
  return result;
};

const createProduct = async (
  payload: TProduct,
  user: JwtPayload,
  files: any,
) => {
  const images: string[] = [];
  if (files && files.length) {
    let imageNo = 0;
    for (const file of files) {
      const imageName = `${user.userId}-${payload?.name}-${payload?.category}-${imageNo}`;
      const path = file?.path;

      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      images.push(secure_url as string);
      imageNo++;
    }
  }
  payload.images = images;
  const vendor = await Vendor.findOne({ user: user.userId });
  if (!vendor) {
    throw new AppError(httpStatus.BAD_REQUEST, "Vendor not found");
  }

  payload.vendor = vendor?._id;
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
