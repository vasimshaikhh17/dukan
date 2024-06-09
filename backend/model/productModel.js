import mongoose from "mongoose";
import { Wishlist } from "./wishList.js";
import { TopProducts } from "./topProducts.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: [true, "Slug is required"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      type: String,
      required: true,
    },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Lenovo"],
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      select: true,
    },
    sold: {
      type: Number,
      default: 0,
      select: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre("remove", async function (next) {
  try {
    await Wishlist.updateMany({}, { $pull: { products: this._id } });
    await TopProducts.updateMany({}, { $pull: { products: this._id } });
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export const Product = mongoose.model("Product", productSchema);
