import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import mongoose from "mongoose";
import { Review } from "./review.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Product } from "../product/product.model";
import { Customer } from "../customer/customer.model";
import QueryBuilder from "../../builder/QueryBuilder";
// customer: Types.ObjectId;
//   product: Types.ObjectId;
//   rating: number;
//   description?: string;
const addReview = async (user: JwtPayload, review: TReview) => {
  const session = await mongoose.startSession();
  if (user.userType === "admin" || user.userType === "vendor") {
    throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to review");
  }
  const customer = await Customer.findOne({ user: user.userId });

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }
  review.customer = customer?._id;
  try {
    await session.startTransaction();
    // Transaction 1: Create Review
    const newReview = await Review.create([review], { session });
    if (!newReview) {
      throw new AppError(httpStatus.BAD_REQUEST, "Review creation failed");
    }
    // Transaction 2: Add review to product
    const product = await Product.findOne({ _id: review.product });
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }
    const newProduct = await Product.findOneAndUpdate(
      { _id: review.product },
      { $push: { productReview: newReview[0]._id } },
      { session },
    );
    if (!newProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, "Review creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newReview[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getReviews = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(
    Review.find().populate("customer product"),
    query,
  )
    .filter()
    .sort()
    .fields();
  const result = await reviewQuery.modelQuery;
  const meta = await reviewQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleReview = async (reviewId: string) => {
  const result = await Review.findById(reviewId).populate("customer product");
  return result;
};

const updateReview = async (
  reviewId: string,
  user: JwtPayload,
  payload: Partial<TReview>,
) => {};

const deleteReview = async (reviewId: string, user: JwtPayload) => {};

export const ReviewServices = {
  addReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
