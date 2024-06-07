import asyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import { Product } from "../model/productModel.js";
import { Wishlist } from "../model/wishList.js";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import mongoose from "mongoose";

export const getAllWishlistsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  try {
    const wishlists = await Wishlist.find({ user: userId }).populate(
      "products"
    );
    res.json(wishlists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongoDbId(_id);
  validateMongoDbId(prodId);

  try {
    let user = await User.findById(_id).populate("wishList");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let wishlist = user.wishList;

    if (!wishlist) {
      wishlist = new Wishlist({ user: _id, products: [] });
    }

    const productIndex = wishlist.products.findIndex(
      (item) => item.toString() === prodId
    );

    if (productIndex !== -1) {
      // Remove product from wishlist
      wishlist.products.splice(productIndex, 1);
    } else {
      // Add product to wishlist
      const product = await Product.findById(prodId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      wishlist.products.push(new mongoose.Types.ObjectId(prodId));
    }

    await wishlist.save();

    if (!user.wishList) {
      user.wishList = wishlist._id;
      await user.save();
    }

    res.json(wishlist);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
