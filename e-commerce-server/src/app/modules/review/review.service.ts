import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import mongoose from "mongoose";
import { Review } from "./review.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Product } from "../product/product.model";
// customer: Types.ObjectId;
//   product: Types.ObjectId;
//   rating: number;
//   description?: string;
const addReview = async (user: JwtPayload, review: TReview) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
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
      if (!newProduct) {
        throw new AppError(httpStatus.BAD_REQUEST, "Review creation failed");
      }
      session.commitTransaction();
      session.endSession();
    );
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Review creation failed");
  }
};

const getReviews = async () => {};

const getSingleReview = async (reviewId: string) => {};

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
