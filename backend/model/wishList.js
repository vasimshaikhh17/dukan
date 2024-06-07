import mongoose from "mongoose";

//schema
const wishListSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

//export
export const Wishlist = mongoose.model("Wishlist", wishListSchema);
