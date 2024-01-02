import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>("Review", reviewSchema);
