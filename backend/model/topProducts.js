import mongoose from "mongoose";

const topProductsSchema = new mongoose.Schema(
  {

    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const TopProducts = mongoose.model("TopProduct", topProductsSchema);
