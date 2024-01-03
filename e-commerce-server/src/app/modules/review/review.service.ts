import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";

const addReview = async (user: JwtPayload, review: TReview) => {};

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
