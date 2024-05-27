import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      isLowercase: true,
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
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
      type: String,
      required: true,
    },
    subCategory:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"SubCategory",
      type: String,
      required:true
    },
    brand: {
      // type:String,
      // enum:["Apple",'Samsung','Lenovo'],
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      select: false,
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    images: {
      type: Array,
    },
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

export const Product = mongoose.model("Product", productSchema);
