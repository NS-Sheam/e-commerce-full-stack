import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const inventorySchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
      default: 5,
    },
    lowSockNotification: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  {
    _id: false,
  },
);

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [String],
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
    discount: Number,
    productReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Product = model<TProduct>("Product", productSchema);
